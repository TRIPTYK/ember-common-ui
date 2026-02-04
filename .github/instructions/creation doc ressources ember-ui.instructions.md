# 🧠 GUIDE DE CRÉATION D'UNE NOUVELLE RESSOURCE DE DOCUMENTATION EMBER-UI

## Rôle de l'agent

Vous êtes un agent IA responsable de la création d'une nouvelle ressource de documentation dans le projet doc-app pour les composants **ember-ui**.

Vous devez strictement suivre les instructions écrites, sans interprétation, sans déduction implicite et sans extrapolation.

Si une information manque, est ambiguë ou contradictoire, vous devez vous arrêter et demander des clarifications.

## Principe fondamental

Le prompt utilisateur suivra toujours ce format :

**"créer la ressource RESOURCE_NAME dans la section ember-ui/prefabs"**

Par exemple : "A partir de ce context #context créer la ressource dropdown dans la section ember-ui/prefabs a partir de #dropdown"

Conséquences obligatoires :
- Le nom de la ressource est fourni par le prompt (RESOURCE_NAME)
- La section cible est toujours `ember-ui/prefabs`
- Ce fichier fournit la structure attendue, les patterns de fichiers, les conventions de routage et les types de composants

⚠️ **Les exemples fournis ci-dessous sont des MODÈLES DE STRUCTURE, pas des définitions fonctionnelles finales**

---

## 📁 Structure du projet doc-app pour ember-ui

```
doc-app/
├── app/
│   ├── router.ts                          # Fichier de routage principal
│   ├── templates/
│   │   └── dashboard.gts                  # Template principal avec sidebar
│   ├── routes/
│   │   └── dashboard/
│   │       └── docs/
│   │           └── ember-ui/
│   │               └── prefabs/
│   │                   └── [resource].ts  # Fichier de route
│   ├── templates/
│   │   └── dashboard/
│   │       └── docs/
│   │           └── ember-ui/
│   │               └── prefabs/
│   │                   └── [resource].gts # Template de la page
│   └── components/
│       └── docs/
│           └── ember-ui/
│               └── prefabs/
│                   └── [resource].gts     # Composant de démonstration
│
└── translations/
    ├── en-us.yaml 
    ├── fr-fr.yaml
    └── ember-ui/
        └── prefabs/
            └── [resource]/
                ├── en-us.yaml
                └── fr-fr.yaml
```

---

## Différences clés avec ember-input-validation

| Aspect | ember-input-validation | ember-ui |
|--------|------------------------|----------|
| **Package** | `@triptyk/ember-input-validation` | `@triptyk/ember-ui` |
| **Composants** | 3 exemples (basic, disabled, error) | 1 exemple unique |
| **Focus** | Validation de formulaires | Composants UI génériques |
| **Propriétés typiques** | @changeset, @validationField | Varie selon le composant |
| **Clé i18n** | `emberInputValidation` | `ember-ui` |
| **Label sidebar** | "[Resource] validation prefab" | "[Resource] prefab" |

---

## Tâches à effectuer (ordre obligatoire)

### 1️⃣ Création de la route

**Fichier à créer :** 
```
doc-app/app/routes/dashboard/docs/ember-ui/prefabs/[RESOURCE_NAME].ts
```

**Structure exacte :**
```typescript
import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabs[ResourceName]Route extends Route {
  model() {
    return {
      properties: [
        {
          name: '@propertyName',
          type: 'string | Function | boolean | number',
          required: true,
          description: 'ember-ui.prefabs.[resource-name].properties.propertyName.description',
        },
        // Ajouter toutes les propriétés du composant
      ],
    };
  }
}
```

**Règles de nommage :**
- Classe : `DocsEmberUiPrefabs` + PascalCase(resource) + `Route`
- Clés i18n : `ember-ui.prefabs.[resource-kebab-case].properties.[property-name].description`

**Exemple concret pour confirm-modal :**
```typescript
import Route from '@ember/routing/route';

export default class DocsEmberUiPrefabsConfirmModalRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@onClose',
          type: 'Function',
          required: true,
          description: 'ember-ui.prefabs.confirm-modal.properties.onClose.description',
        },
        {
          name: '@onConfirm',
          type: 'Function',
          required: true,
          description: 'ember-ui.prefabs.confirm-modal.properties.onConfirm.description',
        },
        {
          name: '@cancelText',
          type: 'string',
          required: true,
          description: 'ember-ui.prefabs.confirm-modal.properties.cancelText.description',
        },
        // ... autres propriétés
      ],
    };
  }
}
```

---

### 2️⃣ Modification du router.ts

**Fichier à modifier :** `doc-app/app/router.ts`

**Localisation exacte :** Dans la section `ember-ui` > `prefabs`

**Exemple avant :**
```typescript
Router.map(function () {
  this.route('dashboard', { path: '/' }, function () {
    this.route('docs', function () {
      this.route('ember-ui', function () {
        this.route('prefabs', function () {
          this.route('confirm-modal');
        });
      });
    });
  });
});
```

**Exemple après (ajout de 'dropdown') :**
```typescript
Router.map(function () {
  this.route('dashboard', { path: '/' }, function () {
    this.route('docs', function () {
      this.route('ember-ui', function () {
        this.route('prefabs', function () {
          this.route('confirm-modal');
          this.route('dropdown');  // ← NOUVELLE ROUTE
        });
      });
    });
  });
});
```

**Contraintes strictes :**
- Respecter l'indentation existante (2 espaces par niveau)
- Ne modifier aucune autre route
- Ajouter la nouvelle route à la fin de la section `ember-ui` > `prefabs`

---

### 3️⃣ Ajout dans la Sidebar

**Fichier à modifier :** `doc-app/app/templates/dashboard.gts`

**Localisation :** Dans le groupe `Ember UI`

**Structure de l'entrée :**
```typescript
{
  type: 'link',
  label: '[Resource Name] prefab',
  route: 'dashboard.docs.ember-ui.prefabs.[resource-name]',
  tooltip: '[Resource Name] prefab',
}
```

**Exemple concret pour 'dropdown' :**
```typescript
menuItems: SidebarItem[] = [
  // ... autres groupes
  {
    type: 'group',
    label: 'Ember UI',
    tooltip: 'Ember UI Prefab',
    items: [
      {
        type: 'link',
        label: 'Confirm modal prefab',
        route: 'dashboard.docs.ember-ui.prefabs.confirm-modal',
        tooltip: 'Confirm modal prefab',
      },
      {
        type: 'link',
        label: 'Dropdown prefab',  // ← NOUVELLE ENTRÉE
        route: 'dashboard.docs.ember-ui.prefabs.dropdown',
        tooltip: 'Dropdown prefab',
      },
    ],
  },
];
```

**⚠️ Différence importante :** Le label est "[Resource Name] prefab" (sans "validation")

---

### 4️⃣ Création du composant de démonstration

**Fichier à créer :**
```
doc-app/app/components/docs/ember-ui/prefabs/[resource-name].gts
```

**⚠️ UN SEUL composant (pas 3 comme ember-input-validation)**

**Structure type :**
```typescript
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Tpk[ResourceName]Prefab from '@triptyk/ember-ui/components/prefabs/tpk-[resource-name]-prefab';

export default class [ResourceName]Example extends Component {
  @tracked propriété1 = valeurInitiale;
  @tracked propriété2 = valeurInitiale;

  @action
  actionMethod() {
    // Logique de démonstration
  }

  <template>
    <Tpk[ResourceName]Prefab
      @prop1={{this.propriété1}}
      @prop2={{this.propriété2}}
      @onAction={{this.actionMethod}}
    />
  </template>
}
```

**Exemple concret pour confirm-modal :**
```typescript
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TpkConfirmModalPrefab from '@triptyk/ember-ui/components/prefabs/tpk-confirm-modal-prefab';
import { action } from '@ember/object';
import TpkButtonPrefabComponent from '@triptyk/ember-input/components/prefabs/tpk-prefab-button';

export default class ConfirmModalExample extends Component {
  @tracked isOpen = false;
  confirmQuestion = 'Are you sure?';

  @action
  open() {
    this.isOpen = true;
  }

  @action
  onClose() {
    this.isOpen = false;
  }

  @action
  onConfirm() {
    this.isOpen = false;
    alert('Confirmed');
  }

  <template>
    <TpkButtonPrefabComponent @onClick={{this.open}} @label="Button Enabled" />
    <TpkConfirmModalPrefab
      @onClose={{this.onClose}}
      @onConfirm={{this.onConfirm}}
      @icon=""
      @cancelText="Annuler"
      @confirmText="Confirmer"
      @confirmQuestion={{this.confirmQuestion}}
      @isOpen={{this.isOpen}}
    />
  </template>
}
```

**Conventions de nommage :**
- Fichier : kebab-case (ex: `confirm-modal.gts`, `dropdown.gts`)
- Classe : PascalCase + `Example` (ex: `ConfirmModalExample`, `DropdownExample`)

---

### 5️⃣ Création du template de route principal

**Fichier à créer :**
```
doc-app/app/templates/dashboard/docs/ember-ui/prefabs/[resource-name].gts
```

**Structure exacte :**
```typescript
import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import [ResourceName]Example from 'doc-app/components/docs/ember-ui/prefabs/[resource-name].gts';

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
  <Prefabs::Tpk[ResourceName]Prefab
    @prop1={{value1}}
    @prop2={{value2}}
  />
  \`;

  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.[resource-name].title"}}
      @description={{t "ember-ui.prefabs.[resource-name].description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.[resource-name].examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.[resource-name].examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <[ResourceName]Example />
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
```

**Exemple concret pour confirm-modal :**
```typescript
import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import ConfirmModalExample from 'doc-app/components/docs/ember-ui/prefabs/confirm-modal.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ConfirmModalPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class ConfirmModalPrefabDocs extends Component<ConfirmModalPrefabDocsSignature> {
  @service declare intl: IntlService;

  confirmModal = \`
  <Prefabs::TpkConfirmModalPrefab
    @onClose={{this.onClose}}
    @onConfirm={{this.onConfirm}}
    @cancelText="Annuler"
    @confirmText="Confirmer"
    @confirmQuestion={{this.confirmQuestion}}
    @isOpen={{this.isOpen}}
  />
  \`;

  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.confirm-modal.title"}}
      @description={{t "ember-ui.prefabs.confirm-modal.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.confirm-modal.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.confirm-modal.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <ConfirmModalExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.confirmModal}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
```

**Règles pour le template :**
- Classe : PascalCase de la ressource + `PrefabDocs`
- Signature : Interface nommée `[ResourceName]PrefabDocsSignature`
- Importer UNIQUEMENT le composant créé (1 seul)
- Variable de code : nom de la ressource en camelCase
- Clés i18n : `ember-ui.prefabs.[resource-name].[sous-section]`

---

### 6️⃣ Ajout des traductions dans les fichiers principaux

**Fichiers à modifier :**
- `doc-app/translations/en-us.yaml`
- `doc-app/translations/fr-fr.yaml`

**Structure à ajouter dans en-us.yaml :**
```yaml
ember-ui:
  prefabs:
    [resource-name]:
      title: '[Resource Name]'
      description: 'Description courte et claire du composant'
      examples:
        title: 'Examples'
        basic: 'Basic usage'
```

**Exemple concret pour confirm-modal :**
```yaml
ember-ui:
  prefabs:
    confirm-modal:
      title: 'Confirm Modal'
      description: 'A modal component for confirmation dialogs.'
      examples:
        title: 'Examples'
        basic: 'Basic usage'
```

**Structure à ajouter dans fr-fr.yaml :**
```yaml
ember-ui:
  prefabs:
    [resource-name]:
      title: '[Nom de la ressource]'
      description: 'Description courte et claire du composant en français'
      examples:
        title: 'Exemples'
        basic: 'Utilisation basique'
```

**Exemple concret pour confirm-modal :**
```yaml
ember-ui:
  prefabs:
    confirm-modal:
      title: 'Modale de confirmation'
      description: 'Un composant de modale pour les dialogues de confirmation.'
      examples:
        title: 'Exemples'
        basic: 'Utilisation basique'
```

**Règles pour les traductions :**
- Clé de section : `ember-ui` (kebab-case avec tiret)
- Clé de ressource : kebab-case du nom de la ressource (ex: `confirm-modal`)
- Structure obligatoire : `title`, `description`, `examples.title`, `examples.basic`
- **NE PAS ajouter de section `properties` ici** - elles sont dans des fichiers séparés
- Le `title` est juste le nom de la ressource en Title Case
- La `description` explique brièvement l'utilité du composant
- `examples.title` : "Examples" (EN) / "Exemples" (FR)
- `examples.basic` : "Basic usage" (EN) / "Utilisation basique" (FR)

**Placement dans le fichier :**
- Si la section `ember-ui` n'existe pas, la créer après `emberInputValidation`
- Ajouter `prefabs` si non existant
- Ajouter la ressource en ordre alphabétique sous `prefabs`

---

### 7️⃣ Création des traductions de propriétés

**Fichiers à créer :**
```
doc-app/translations/ember-ui/prefabs/[resource-name]/en-us.yaml
doc-app/translations/ember-ui/prefabs/[resource-name]/fr-fr.yaml
```

**Structure en-us.yaml :**
```yaml
properties:
  propertyName1:
    description: 'Description of the property in English.'
  propertyName2:
    description: 'Description of the property in English.'
  # Une entrée par propriété définie dans la route
```

**Structure fr-fr.yaml :**
```yaml
properties:
  propertyName1:
    description: 'Description de la propriété en français.'
  propertyName2:
    description: 'Description de la propriété en français.'
  # Une entrée par propriété définie dans la route
```

**Exemple concret pour confirm-modal (en-us.yaml) :**
```yaml
properties:
  onClose:
    description: 'Function to close the modal.'
  onConfirm:
    description: 'Function called when the user confirms the action.'
  cancelText:
    description: 'Text to display on the cancel button.'
  confirmText:
    description: 'Text to display on the confirm button.'
  confirmQuestion:
    description: 'The confirmation question to display to the user.'
  isOpen:
    description: 'Boolean to control the modal visibility.'
```

**Exemple concret pour confirm-modal (fr-fr.yaml) :**
```yaml
properties:
  onClose:
    description: 'Fonction pour fermer la modale.'
  onConfirm:
    description: 'Fonction appelée lorsque l\'utilisateur confirme l\'action.'
  cancelText:
    description: 'Texte à afficher sur le bouton annuler.'
  confirmText:
    description: 'Texte à afficher sur le bouton confirmer.'
  confirmQuestion:
    description: 'La question de confirmation à afficher à l\'utilisateur.'
  isOpen:
    description: 'Booléen pour contrôler la visibilité de la modale.'
```

**Règles :**
- Nom de propriété en camelCase (sans le @)
- Une description par propriété
- Descriptions courtes et claires
- Cohérence entre EN et FR

---

## 🔄 Tableau de correspondance des transformations

| Type | Exemple Input | Transformation | Exemple Output |
|------|---------------|----------------|----------------|
| Route name | confirm-modal | kebab-case | `this.route('confirm-modal')` |
| Route file | confirm-modal | kebab-case | `prefabs/confirm-modal.ts` |
| Route class | confirm-modal | PascalCase | `DocsEmberUiPrefabsConfirmModalRoute` |
| Template file | confirm-modal | kebab-case | `prefabs/confirm-modal.gts` |
| Component file | confirm-modal | kebab-case | `confirm-modal.gts` |
| Component class | confirm-modal | PascalCase + suffix | `ConfirmModalExample` |
| Import name | confirm-modal | PascalCase | `ConfirmModalExample` |
| Menu label | confirm-modal | Title Case + suffix | `Confirm modal prefab` |
| Route path | confirm-modal | kebab-case | `dashboard.docs.ember-ui.prefabs.confirm-modal` |
| Translation key | confirm-modal | kebab-case with dots | `ember-ui.prefabs.confirm-modal.title` |
| Package import | confirm-modal | kebab-case | `@triptyk/ember-ui/components/prefabs/tpk-confirm-modal-prefab` |

---

## ⚠️ Contraintes strictes

### ❌ INTERDIT
- Créer plusieurs composants de démo (basic, disabled, error) comme pour ember-input-validation
- Utiliser `@triptyk/ember-input-validation` comme package
- Ajouter automatiquement des propriétés `@changeset` ou `@validationField` (sauf si explicitement demandé)
- Utiliser la clé i18n `emberInputValidation`
- Ajouter "validation" dans les labels de la sidebar
- Copier la logique métier de confirm-modal pour une autre ressource

### ✅ OBLIGATOIRE
- Créer UN SEUL composant de démonstration
- Utiliser `@triptyk/ember-ui` comme package
- Respecter le format des clés i18n : `ember-ui.prefabs.[resource-name]`
- Label sidebar : "[Resource Name] prefab" (sans "validation")
- Créer les traductions dans les deux langues (EN et FR)
- Respecter l'indentation et la structure existantes

### 🛑 En cas de doute
**STOP et demander des clarifications**

---

## 📝 Exemple complet : Création de la ressource "tooltip"

**Prompt utilisateur :** "créer la ressource tooltip dans la section ember-ui/prefabs"

### Fichiers à créer :

1. `doc-app/app/routes/dashboard/docs/ember-ui/prefabs/tooltip.ts`
2. `doc-app/app/templates/dashboard/docs/ember-ui/prefabs/tooltip.gts`
3. `doc-app/app/components/docs/ember-ui/prefabs/tooltip.gts`
4. `doc-app/translations/ember-ui/prefabs/tooltip/en-us.yaml`
5. `doc-app/translations/ember-ui/prefabs/tooltip/fr-fr.yaml`

### Fichiers à modifier :

1. `doc-app/app/router.ts` - Ajouter `this.route('tooltip');`
2. `doc-app/app/templates/dashboard.gts` - Ajouter l'entrée menu pour tooltip
3. `doc-app/translations/en-us.yaml` - Ajouter les traductions principales EN
4. `doc-app/translations/fr-fr.yaml` - Ajouter les traductions principales FR

---

## 🎯 Checklist de validation

Avant de considérer la tâche terminée, vérifier :

- [ ] La route est ajoutée dans `router.ts` (section `ember-ui` > `prefabs`)
- [ ] Le fichier de route existe avec le bon nom de classe (`DocsEmberUiPrefabs[Resource]Route`)
- [ ] L'entrée de menu est ajoutée dans `dashboard.gts` (groupe "Ember UI")
- [ ] Le label du menu est "[Resource] prefab" (SANS "validation")
- [ ] UN SEUL composant de démo est créé (pas 3)
- [ ] Le composant de démo utilise `@triptyk/ember-ui`
- [ ] Le template principal est créé et importe le bon composant
- [ ] Tous les noms sont adaptés à la nouvelle ressource
- [ ] Aucun nom d'exemple (confirm-modal) n'apparaît dans les nouveaux fichiers
- [ ] Les clés i18n suivent le pattern `ember-ui.prefabs.[resource]`
- [ ] Les fichiers de traduction principaux (en-us.yaml et fr-fr.yaml) sont mis à jour
- [ ] Les fichiers de traduction de propriétés sont créés (EN et FR)
- [ ] Les traductions correspondent aux propriétés définies dans la route
- [ ] L'indentation est cohérente avec le reste du projet

---

## 🔍 Différences récapitulatives ember-input-validation vs ember-ui

### Structure des composants de démo

**ember-input-validation :**
```
components/docs/ember-input-validation/prefabs/
├── basic-input.gts
├── disabled-input.gts
└── error-input.gts
```

**ember-ui :**
```
components/docs/ember-ui/prefabs/
└── confirm-modal.gts
```

### Labels de la sidebar

**ember-input-validation :**
```typescript
{
  label: 'Input validation prefab',
  route: 'dashboard.docs.ember-input-validation.prefabs.input',
}
```

**ember-ui :**
```typescript
{
  label: 'Confirm modal prefab',
  route: 'dashboard.docs.ember-ui.prefabs.confirm-modal',
}
```

### Clés de traduction

**ember-input-validation :**
```yaml
emberInputValidation:
  prefabs:
    input:
      title: 'Input'
```

**ember-ui :**
```yaml
ember-ui:
  prefabs:
    confirm-modal:
      title: 'Confirm Modal'
```

### Import des packages

**ember-input-validation :**
```typescript
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
```

**ember-ui :**
```typescript
import TpkConfirmModalPrefab from '@triptyk/ember-ui/components/prefabs/tpk-confirm-modal-prefab';
```

---

## ✨ Conclusion

Ce guide est spécifique aux composants **ember-ui**. Pour les composants **ember-input-validation**, référez-vous au guide "creation doc ressources.instructions.md".

La principale différence réside dans :
1. Le nombre de composants de démo (1 au lieu de 3)
2. Les labels (sans "validation")
3. Les clés i18n (`ember-ui` au lieu de `emberInputValidation`)
4. Le package importé (`@triptyk/ember-ui`)
