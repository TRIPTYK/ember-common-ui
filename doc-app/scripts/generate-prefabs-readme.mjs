// Generates the prefab catalogue of packages/ember-input-validation/README.md
// from the doc-app pages, so the published package documents every prefab.
// Usage: node scripts/generate-prefabs-readme.mjs [--check]
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { format, resolveConfig } from 'prettier';

const docApp = join(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = join(docApp, '../packages/ember-input-validation/README.md');
const tpkFormPath = join(
  docApp,
  '../packages/ember-input-validation/src/components/tpk-form.gts',
);
const routesDir = join(
  docApp,
  'app/routes/dashboard/docs/ember-input-validation/prefabs',
);
const translationsDir = join(docApp, 'translations');
const docsUrl =
  'https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs';
const START = '<!-- prefabs:start -->';
const END = '<!-- prefabs:end -->';

const pascalCase = (slug) =>
  slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
const camelCase = (slug) =>
  slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function get(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

// ember-intl namespaces a nested translation file by its folder path.
function loadTranslations(dir, namespace = []) {
  const translations = {};
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      Object.assign(
        translations,
        loadTranslations(join(dir, entry.name), [...namespace, entry.name]),
      );
    } else if (entry.name === 'en-us.yaml') {
      const content = parse(readFileSync(join(dir, entry.name), 'utf8'));
      if (namespace.length) {
        translations[namespace.join('.')] = content;
      } else {
        Object.assign(translations, content);
      }
    }
  }
  return translations;
}

function translate(translations, key) {
  const namespace = Object.keys(translations)
    .filter((ns) => key.startsWith(`${ns}.`))
    .sort((a, b) => b.length - a.length)[0];
  const value = namespace
    ? get(translations[namespace], key.slice(namespace.length + 1))
    : get(translations, key);
  if (typeof value !== 'string') {
    throw new Error(`Missing en-us translation for "${key}"`);
  }
  return value;
}

function parseProperties(routeFile) {
  const source = readFileSync(routeFile, 'utf8');
  const string = `(['"\`])((?:\\\\.|(?!\\1).)*)\\1`;
  const property = new RegExp(
    `\\{\\s*name:\\s*${string},\\s*type:\\s*${string},\\s*required:\\s*(true|false),\\s*description:\\s*${string},?\\s*\\}`,
    'gs',
  );
  const properties = [...source.matchAll(property)].map((match) => ({
    name: match[2],
    type: match[4],
    required: match[5] === 'true',
    description: match[7],
  }));
  const declared = source.match(/\bname:/g)?.length ?? 0;
  if (properties.length !== declared) {
    throw new Error(
      `${relative(docApp, routeFile)}: parsed ${properties.length} of ${declared} properties, update the parser`,
    );
  }
  return properties;
}

const inline = (text) => text.replace(/\s*\n\s*/g, ' ');

function mostFrequent(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0][0];
}

const renderArgument = (argument) =>
  `- \`${argument.name}\` (\`${inline(argument.type)}\`${argument.required ? ', required' : ''}): ${inline(argument.description)}`;

function renderCatalogue() {
  const translations = loadTranslations(translationsDir);
  const yielded = new Set(
    readFileSync(tpkFormPath, 'utf8').match(/\bTpk\w+Prefab(?=:)/g),
  );
  const prefabs = readdirSync(routesDir)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace(/\.ts$/, ''))
    .sort()
    .map((slug) => {
      const page = `emberInputValidation.prefabs.${camelCase(slug)}`;
      return {
        slug,
        name: `Tpk${pascalCase(slug)}Prefab`,
        title: translate(translations, `${page}.title`),
        description: translate(translations, `${page}.description`),
        arguments: parseProperties(join(routesDir, `${slug}.ts`)).map(
          (property) => ({
            ...property,
            description: translate(translations, property.description),
          }),
        ),
      };
    });

  // Arguments shared by most prefabs are documented once instead of 23 times.
  const allArguments = prefabs.flatMap((prefab) => prefab.arguments);
  const common = [...new Set(allArguments.map((argument) => argument.name))]
    .map((name) => allArguments.filter((argument) => argument.name === name))
    .filter((occurrences) => occurrences.length > prefabs.length / 2)
    .map((occurrences) => ({
      name: occurrences[0].name,
      type: mostFrequent(occurrences.map((argument) => argument.type)),
      required: mostFrequent(occurrences.map((argument) => argument.required)),
      description: mostFrequent(
        occurrences.map((argument) => argument.description),
      ),
    }));
  // Type spellings vary between pages (Changeset/ImmerChangeset, Function/function):
  // a common argument is only repeated when its type is a full signature.
  const isCommon = (argument) =>
    !argument.type.includes('=>') &&
    common.some(
      (shared) =>
        shared.name === argument.name && shared.required === argument.required,
    );

  const index = [
    '### Index',
    '| Prefab | For |\n| --- | --- |\n' +
      prefabs
        .map(
          (prefab) =>
            `| [\`${prefab.name}\`](#${prefab.name.toLowerCase()}) | ${prefab.title} |`,
        )
        .join('\n'),
  ];
  const commonSection = [
    '### Common arguments',
    'Accepted by most prefabs. Each prefab below lists only its other arguments, and the common ones it does not support.',
    common.map(renderArgument).join('\n'),
  ];
  const details = prefabs.map((prefab) => {
    const own = prefab.arguments.filter((argument) => !isCommon(argument));
    const unsupported = common
      .filter(
        (shared) =>
          !prefab.arguments.some((argument) => argument.name === shared.name),
      )
      .map((shared) => `\`${shared.name}\``);
    return [
      `#### ${prefab.name}`,
      `${inline(prefab.description)} [Docs](${docsUrl}/${prefab.slug})`,
      yielded.has(prefab.name)
        ? ''
        : `Not yielded by \`<TpkForm>\`: import \`@triptyk/ember-input-validation/components/prefabs/tpk-validation-${prefab.slug}\`.`,
      own.length ? own.map(renderArgument).join('\n') : '',
      unsupported.length ? `Does not support: ${unsupported.join(', ')}.` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  });

  return [...index, ...commonSection, '### Catalogue', ...details].join('\n\n');
}

const readme = readFileSync(readmePath, 'utf8');
const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1) {
  throw new Error(`README.md must contain ${START} and ${END}`);
}
const generated = await format(
  `${readme.slice(0, start + START.length)}\n\n${renderCatalogue()}\n\n${readme.slice(end)}`,
  { ...(await resolveConfig(readmePath)), parser: 'markdown' },
);

if (process.argv.includes('--check')) {
  if (generated !== readme) {
    console.error(
      'packages/ember-input-validation/README.md is out of date with the doc-app. Run `pnpm --filter doc-app docs:readme`.',
    );
    process.exitCode = 1;
  }
} else {
  writeFileSync(readmePath, generated);
}
