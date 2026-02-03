
# 🧠 GUIDE DE CRÉATION D'UNE NOUVELLE RESSOURCE DE DOCUMENTATION

## Rôle de l'agent

Vous êtes un agent IA responsable de la création d'une nouvelle ressource de documentation dans le projet doc-app.

Vous devez strictement suivre les instructions écrites, sans interprétation, sans déduction implicite et sans extrapolation.

Si une information manque, est ambiguë ou contradictoire, vous devez vous arrêter et demander des clarifications.

## Principe fondamental

Le prompt utilisateur suivra toujours ce format :

**"créer la ressource RESOURCE_NAME dans la section SECTION_NAME"**

Par exemple : "A partir de ce context #context créer la ressource checkbox dans la section ember-input-validation/prefabs a partir de #checkbox"

Conséquences obligatoires :
- Le nom de la ressource est fourni par le prompt (RESOURCE_NAME)
- La section cible est fournie par le prompt (SECTION_NAME)
- Ce fichier fournit la structure attendue, les patterns de fichiers, les conventions de routage et les types de composants

⚠️ **Les exemples fournis ci-dessous sont des MODÈLES DE STRUCTURE, pas des définitions fonctionnelles finales**

---

## 📁 Structure du projet doc-app

\`\`\`
doc-app/
├── app/
│   ├── router.ts                          # Fichier de routage principal
│   ├── templates/
│   │   └── dashboard.gts                  # Template principal avec sidebar
│   ├── routes/
│   │   └── dashboard/
│   │       └── docs/
│   │           └── [section]/
│   │               └── prefabs/
│   │                   └── [resource].ts  # Fichier de route
│   ├── templates/
│   │   └── dashboard/
│   │       └── docs/
│   │           └── [section]/
│   │               └── prefabs/
│   │                   └── [resource].gts # Template de la page
│   └── components/
│       └── docs/
│           └── [section]/
│               └── prefabs/
│                   ├── basic-[resource].gts
│                   ├── disabled-[resource].gts
│                   └── error-[resource].gts
│
└── translations/
│   ├── en-us.yaml 
│   └── [section]/
│       └── prefabs/
|           └── [resource]/en-us.yaml
\`\`\`

---

## Tâches à effectuer (ordre obligatoire)

### 1️⃣ Création de la route

**Fichier à créer :** 
\`\`\`
doc-app/app/routes/dashboard/docs/[SECTION_NAME]/prefabs/[RESOURCE_NAME].ts
\`\`\`

**Structure exacte :**
\`\`\`typescript
// doc-app/app/routes/docs/[section-name]/prefabs/[resource-name].ts
import Route from '@ember/routing/route';

export default class Docs[SectionName]Prefabs[ResourceName]Route extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description: '[section-key].prefabs.[resource-name].properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description: '[section-key].prefabs.[resource-name].properties.changeset.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description: '[section-key].prefabs.[resource-name].properties.label.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description: '[section-key].prefabs.[resource-name].properties.placeholder.description',
        },
        // Ajouter les autres propriétés spécifiques à la ressource
      ],
    };
  }
}
\`\`\`

**Règles de nommage :**
- Classe : \`Docs\` + PascalCase(section) + \`Prefabs\` + PascalCase(resource) + \`Route\`
- Clés i18n : \`[section-kebab-case].prefabs.[resource-kebab-case].properties.[property-name].description\`

---

### 2️⃣ Modification du router.ts

**Fichier à modifier :** \`doc-app/app/router.ts\`

**Localisation exacte :** Dans la fonction \`Router.map()\`, sous la section correspondante

**Exemple avant :**
\`\`\`typescript
Router.map(function () {
  this.route('dashboard', { path: '/' }, function () {
    this.route('docs', function () {
      this.route('ember-input-validation', function () {
        this.route('prefabs', function () {
          this.route('input');
          this.route('number');
        });
      });
    });
  });
});
\`\`\`

**Exemple après (ajout de 'checkbox') :**
\`\`\`typescript
Router.map(function () {
  this.route('dashboard', { path: '/' }, function () {
    this.route('docs', function () {
      this.route('ember-input-validation', function () {
        this.route('prefabs', function () {
          this.route('input');
          this.route('number');
          this.route('checkbox');  // ← NOUVELLE ROUTE
        });
      });
    });
  });
});
\`\`\`

**Contraintes strictes :**
- Respecter l'indentation existante
- Ne modifier aucune autre route
- Ajouter la nouvelle route à la fin de la section concernée

---

### 3️⃣ Ajout dans la Sidebar

**Fichier à modifier :** \`doc-app/app/templates/dashboard.gts\`

**Structure de l'entrée :**
\`\`\`typescript
menuItems = [
  // ... entrées existantes
  {
    label: '[Resource Name] validation prefab',
    route: 'dashboard.docs.[section-name].prefabs.[resource-name]',
    tooltip: '[Resource Name] validation prefab',
  },
];
\`\`\`

**Exemple concret pour 'checkbox' dans 'ember-input-validation' :**
\`\`\`typescript
menuItems = [
  {
    label: 'Input validation prefab',
    route: 'dashboard.docs.ember-input-validation.prefabs.input',
    tooltip: 'Input validation prefab',
  },
  {
    label: 'Number validation prefab',
    route: 'dashboard.docs.ember-input-validation.prefabs.number',
    tooltip: 'Number validation prefab',
  },
  {
    label: 'Checkbox validation prefab',  // ← NOUVELLE ENTRÉE
    route: 'dashboard.docs.ember-input-validation.prefabs.checkbox',
    tooltip: 'Checkbox validation prefab',
  },
];
\`\`\`

---

### 4️⃣ Création des composants de démonstration

**Dossier de création :**
\`\`\`
doc-app/app/components/docs/[section-name]/prefabs/
\`\`\`

**Composants obligatoires à créer :**

#### a) basic-[resource-name].gts
\`\`\`typescript
// doc-app/app/components/docs/[section-name]/prefabs/basic-[resource-name].gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import Tpk[ResourceName]Prefab from '@triptyk/[package-name]/components/prefabs/tpk-validation-[resource-name]';

export default class Basic[ResourceName]Example extends Component {
  @tracked changeset = new ImmerChangeset({
    something: '',  // Adapter selon le type de donnée
  });

  <template>
    <Tpk[ResourceName]Prefab
      @label="[Resource Label]"
      @changeset={{this.changeset}}
      @validationField="something"
    />
  </template>
}
\`\`\`

#### b) disabled-[resource-name].gts
\`\`\`typescript
// doc-app/app/components/docs/[section-name]/prefabs/disabled-[resource-name].gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import Tpk[ResourceName]Prefab from '@triptyk/[package-name]/components/prefabs/tpk-validation-[resource-name]';

export default class Disabled[ResourceName]Example extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'This is disabled',  // Adapter selon le type
  });

  <template>
    <Tpk[ResourceName]Prefab
      @label="Disabled [Resource Name]"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
\`\`\`

#### c) error-[resource-name].gts
\`\`\`typescript
// doc-app/app/components/docs/[section-name]/prefabs/error-[resource-name].gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import Tpk[ResourceName]Prefab from '@triptyk/[package-name]/components/prefabs/tpk-validation-[resource-name]';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class Error[ResourceName]Example extends Component {
  @tracked changeset = new ImmerChangeset({
    something: '',  // Adapter selon le type
  });

  @action
  onChange(value: string | number | Date | null) {
    // Logique de validation d'exemple
    // Adapter selon les règles métier de la ressource

    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'should be a string value',
        value: 'err',
        originalValue: '',
        key: 'something',
      });
    }
    if ((value as string)?.length >= 5) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Minimum 5 characters',
        value: 'err',
        originalValue: '',
        key: 'something',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Minimum 5 characters',
        value: 'err',
        originalValue: '',
        key: 'something',
      });
    }, 0);
  }

  <template>
    <Tpk[ResourceName]Prefab
      @label="[Resource Name]"
      @changeset={{this.changeset}}
      @validationField="something"
      @onChange={{this.onChange}}
    />
  </template>
}
\`\`\`

**Conventions de nommage des composants :**
- Fichiers : kebab-case (ex: \`basic-input.gts\`, \`error-checkbox.gts\`)
- Classes : PascalCase (ex: \`BasicInputExample\`, \`ErrorCheckboxExample\`)
- Pattern : \`[Type][ResourceName]Example\`

---

### 5️⃣ Création du template de route principal

**Fichier à créer :**
\`\`\`
doc-app/app/templates/dashboard/docs/[section-name]/prefabs/[resource-name].gts
\`\`\`

**Structure exacte :**
\`\`\`typescript
import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import Basic[ResourceName]Example from 'doc-app/components/docs/[section-name]/prefabs/basic-[resource-name].gts';
import Disabled[ResourceName]Example from 'doc-app/components/docs/[section-name]/prefabs/disabled-[resource-name].gts';
import Error[ResourceName]Example from 'doc-app/components/docs/[section-name]/prefabs/error-[resource-name].gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface [ResourceName]PrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class [ResourceName]PrefabDocs extends Component<[ResourceName]PrefabDocsSignature> {
  @service declare intl: IntlService;
  
  [resourceName] = \`
  <Tpk[ResourceName]Prefab
    @label='[Resource Label]'
    @changeset={{this.changeset}}
    @validationField='something'
  />
  \`;

  <template>
    <DocPage
      @title={{t "[sectionKey].prefabs.[resourceName].title"}}
      @description={{t "[sectionKey].prefabs.[resourceName].description"}}
    >
      <DocSection
        @title={{t "[sectionKey].prefabs.[resourceName].examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "[sectionKey].prefabs.[resourceName].examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <Basic[ResourceName]Example />
              <Disabled[ResourceName]Example />
              <Error[ResourceName]Example />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.[resourceName]}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
\`\`\`

**Règles pour le template :**
- Classe : PascalCase de la ressource + \`PrefabDocs\`
- Signature : Interface nommée \`[ResourceName]PrefabDocsSignature\`
- Importer UNIQUEMENT les composants créés (basic, disabled, error)
- Variable de code : nom de la ressource en camelCase
- Clés i18n : \`[sectionKey].prefabs.[resourceName].[sous-section]\`

---

### 6️⃣ Ajout des traductions

**Fichier à modifier :** \`doc-app/translations/en-us.yaml\`

**Structure à ajouter :**
\`\`\`yaml
[sectionKey]:
  prefabs:
    [resourceName]:
      title: '[Resource Name]'
      description: 'Description courte et claire du composant de validation'
      examples:
        title: 'Examples'
        basic: 'Basic usage'
\`\`\`

**Exemple concret pour 'checkbox' dans 'ember-input-validation' :**
\`\`\`yaml
emberInputValidation:
  prefabs:
    checkbox:
      title: 'Checkbox'
      description: 'A reusable validation component for checkboxes with integrated error handling'
      examples:
        title: 'Examples'
        basic: 'Basic usage'
\`\`\`

**Règles pour les traductions :**
- Clé de section : camelCase du nom de la section (ex: \`emberInputValidation\`)
- Clé de ressource : camelCase du nom de la ressource (ex: \`checkbox\`)
- Structure obligatoire : \`title\`, \`description\`, \`examples.title\`, \`examples.basic\`
- **NE PAS ajouter de section \`properties\`** - les descriptions des propriétés sont dans le fichier de route
- Le \`title\` est juste le nom de la ressource (sans "validation prefab")
- La \`description\` explique brièvement l'utilité du composant
- \`examples.title\` doit toujours être "Examples"
- \`examples.basic\` doit toujours être "Basic usage"
- Format : Respecter l'indentation YAML (2 espaces)

**Placement dans le fichier :**
- Localiser la section correspondante (ex: \`emberInputValidation\`)
- Si la section n'existe pas, la créer en respectant l'ordre alphabétique
- Ajouter \`prefabs\` si non existant
- Ajouter la ressource en ordre alphabétique sous \`prefabs\`

**⚠️ IMPORTANT :** Les descriptions des propriétés (@validationField, @changeset, etc.) sont définies dans le fichier de route (routes/dashboard/docs/[section]/prefabs/[resource].ts) et NON dans le fichier YAML

---

## 🔄 Tableau de correspondance des transformations

| Type | Exemple Input | Transformation | Exemple Output |
|------|---------------|----------------|----------------|
| Route name | checkbox | kebab-case | \`this.route('checkbox')\` |
| Route file | checkbox | kebab-case | \`prefabs/checkbox.ts\` |
| Route class | checkbox | PascalCase | \`DocsEmberInputValidationPrefabsCheckboxRoute\` |
| Template file | checkbox | kebab-case | \`prefabs/checkbox.gts\` |
| Component file | checkbox | kebab-case + prefix | \`basic-checkbox.gts\` |
| Component class | checkbox | PascalCase + suffix | \`BasicCheckboxExample\` |
| Import name | checkbox | PascalCase | \`BasicCheckboxExample\` |
| Menu label | checkbox | Title Case + suffix | \`Checkbox validation prefab\` |
| Route path | checkbox | kebab-case | \`dashboard.docs.ember-input-validation.prefabs.checkbox\` |
| Section i18n key | ember-input-validation | camelCase | \`emberInputValidation\` |
| Resource i18n key | checkbox | camelCase | \`checkbox\` |
| Translation key | checkbox | camelCase with dots | \`emberInputValidation.prefabs.checkbox.title\` |

---

## ⚠️ Contraintes strictes

### ❌ INTERDIT
- Réutiliser les noms de ressources des exemples (input, number)
- Copier les données métier des exemples
- Inventer une logique en dehors du contexte
- Créer des composants supplémentaires non mentionnés
- Modifier d'autres routes que celle créée

### ✅ OBLIGATOIRE
- Remplacer TOUS les éléments dépendants de la ressource
- Respecter l'indentation et la structure existantes
- Suivre les conventions de nommage décrites
- Créer exactement 3 composants de démonstration (basic, disabled, error)
- Importer uniquement les composants créés

### 🛑 En cas de doute
**STOP et demander des clarifications**

---

## 📝 Exemple complet : Création de la ressource "select"

**Prompt utilisateur :** "créer la ressource select dans la section ember-input-validation/prefabs"

### Fichiers à créer :

1. \`doc-app/app/routes/dashboard/docs/ember-input-validation/prefabs/select.ts\`
2. \`doc-app/app/templates/dashboard/docs/ember-input-validation/prefabs/select.gts\`
3. \`doc-app/app/components/docs/ember-input-validation/prefabs/basic-select.gts\`
4. \`doc-app/app/components/docs/ember-input-validation/prefabs/disabled-select.gts\`
5. \`doc-app/app/components/docs/ember-input-validation/prefabs/error-select.gts\`

### Fichiers à modifier :

1. \`doc-app/app/router.ts\` - Ajouter \`this.route('select');\`
2. \`doc-app/app/templates/dashboard.gts\` - Ajouter l'entrée menu pour select
3. \`doc-app/translations/en-us.yaml\` - Ajouter les traductions pour select

---

## 🎯 Checklist de validation

Avant de considérer la tâche terminée, vérifier :

- [ ] La route est ajoutée dans \`router.ts\`
- [ ] Le fichier de route existe avec le bon nom de classe
- [ ] L'entrée de menu est ajoutée dans \`dashboard.gts\`
- [ ] Les 3 composants de démo sont créés (basic, disabled, error)
- [ ] Le template principal est créé et importe les bons composants
- [ ] Tous les noms sont adaptés à la nouvelle ressource
- [ ] Aucun nom d'exemple (input, number) n'apparaît dans les nouveaux fichiers
- [ ] Les clés i18n suivent le pattern correct
- [ ] Le fichier de traduction \`en-us.yaml\` est mis à jour avec toutes les clés nécessaires
- [ ] Les traductions correspondent exactement aux propriétés définies dans la route
- [ ] L'indentation est cohérente avec le reste du projet