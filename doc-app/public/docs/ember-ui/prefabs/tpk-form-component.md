# TpkForm Component

Un composant de formulaire complet qui intègre la validation avec `ember-immer-changeset` et `zod`. Le composant fournit une validation automatique, gestion des erreurs et yield des composants de validation pré-configurés.

<DocsDemo as |demo|>
<demo.example @name="tpk-form-basic-example.hbs">
<TpkForm
@changeset={{this.changeset}}
@onSubmit={{this.handleSubmit}}
@validationSchema={{this.validationSchema}}
as |F|

> <F.TpkInputPrefab

    @label="Prénom"
    @validationField="firstName"

/>

<F.TpkInputPrefab
@label="Nom"
@validationField="lastName"
/>

<F.TpkEmailPrefab
@label="Email"
@validationField="email"
/>

<button class="button" type="submit">Soumettre</button>
</TpkForm>
</demo.example>
<demo.snippet @name="tpk-form-basic-example.hbs"/>
</DocsDemo>

## Propriétés obligatoires

- `@changeset`: Une instance de [ImmerChangeset](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html) contenant les données du formulaire. Ce changeset gère l'état du formulaire et les erreurs de validation.
- `@onSubmit`: Une fonction callback exécutée quand le formulaire est soumis avec des données valides. Reçoit deux paramètres : `(data, changeset)` où data est l'objet validé et changeset est l'instance ImmerChangeset.
- `@validationSchema`: Un schéma Zod (ZodObject) qui définit les règles de validation pour les champs du formulaire.

## Propriétés optionnelles

- `@reactive` (Boolean, défaut: `true`): Quand activé, valide les champs individuellement dès que leurs valeurs changent. Mettez à `false` pour valider uniquement lors de la soumission.
- `@removeErrorsOnSubmit` (Boolean, défaut: `true`): Efface toutes les erreurs de validation existantes avant d'effectuer la validation lors de la soumission.
- `@autoScrollOnError` (Boolean, défaut: `true`): Fait défiler automatiquement vers la première erreur de validation quand la soumission échoue.
- `@disabled` (Boolean, défaut: `false`): Désactive tous les inputs du formulaire quand défini à `true`.
- `@executeOnValid` (Boolean, défaut: `true`): Exécute automatiquement le changeset (applique les modifications draft aux données) quand la validation réussit.

## Guide d'implémentation

### 1. Configuration du Controller/Component

Créez un changeset, un schéma de validation et un gestionnaire de soumission :

```typescript
import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, email } from 'zod';
import { action } from '@ember/object';

export default class MyFormController extends Controller {
  // Initialiser un changeset vide
  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Définir les règles de validation avec Zod
  validationSchema = object({
    firstName: string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: string().email('Doit être une adresse email valide'),
  });

  @action
  handleSubmit(validatedData, changeset) {
    // validatedData contient les données validées du formulaire
    // changeset est l'instance ImmerChangeset
    console.log('Formulaire soumis avec:', validatedData);
    // Effectuez votre appel API ou traitement de données ici
  }
}
```

### 2. Utilisation du composant TpkForm

Le formulaire yield un hash de composants de validation pré-configurés :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  {{! Utiliser les composants prefab yieldés }}
  <F.TpkInputPrefab
    @label="Prénom"
    @validationField="firstName"
  />

  <F.TpkInputPrefab
    @label="Nom"
    @validationField="lastName"
  />

  <F.TpkEmailPrefab
    @label="Adresse Email"
    @validationField="email"
  />

  <button type="submit">Soumettre</button>
</TpkForm>
```

### 3. Composants Yieldés disponibles

Le composant `TpkForm` yield de nombreux composants pré-configurés, tous automatiquement liés avec le changeset, l'état disabled et les champs requis :

#### Composants de base (pour layouts personnalisés)

- `F.TpkInput` - Composant input de base
- `F.TpkTextarea` - Composant textarea de base
- `F.TpkSelect` - Composant select de base
- `F.TpkCheckbox` - Composant checkbox de base
- `F.TpkRadio` - Composant radio de base
- `F.TpkRadioGroup` - Composant groupe de radios
- `F.TpkFile` - Composant input fichier de base
- `F.TpkDatepicker` - Composant datepicker de base

#### Composants Prefab (prêts à l'emploi)

- `F.TpkInputPrefab` - Input texte standard
- `F.TpkTextareaPrefab` - Textarea avec validation
- `F.TpkSelectPrefab` - Menu déroulant select
- `F.TpkSelectCreatePrefab` - Select avec option de création
- `F.TpkSelectSearchPrefab` - Select avec recherche
- `F.TpkCheckboxPrefab` - Checkbox avec label
- `F.TpkRadioPrefab` - Bouton radio unique
- `F.TpkRadioGroupPrefab` - Groupe de boutons radio
- `F.TpkFilePrefab` - Input upload de fichier

#### Inputs Prefab Spécialisés

- `F.TpkPasswordPrefab` - Input mot de passe avec toggle de visibilité
- `F.TpkEmailPrefab` - Input email avec validation
- `F.TpkMobilePrefab` - Input numéro de téléphone mobile
- `F.TpkIbanPrefab` - Input IBAN (compte bancaire)
- `F.TpkBicPrefab` - Input code BIC/SWIFT
- `F.TpkVatPrefab` - Input numéro de TVA
- `F.TpkNationalNumberPrefab` - Input numéro d'identification nationale
- `F.TpkCurrencyPrefab` - Input montant/devise
- `F.TpkIntegerPrefab` - Input nombre entier
- `F.TpkNumberPrefab` - Input nombre décimal

#### Prefabs Date/Heure

- `F.TpkDatepickerPrefab` - Sélecteur de date unique
- `F.TpkDatepickerRangePrefab` - Sélecteur de plage de dates
- `F.TpkTimepickerPrefab` - Sélecteur d'heure

#### Valeurs Helper Yieldées

- `F.changesetGet` - Fonction pour récupérer des valeurs du changeset (raccourci pour `changeset.get()`)
- `F.requiredFields` - Tableau des noms de champs qui sont requis selon le schéma de validation

### 4. Utiliser les composants de base pour layouts personnalisés

Les composants de base vous donnent un contrôle complet sur le markup :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  <F.TpkInput
    @label="Nom d'utilisateur"
    @validationField="username"
    as |I|
  >
    <I.Label />
    <I.Input />
    {{#if I.errors}}
      <div class="error-messages">
        {{#each I.errors as |error|}}
          <p class="error">{{error.message}}</p>
        {{/each}}
      </div>
    {{/if}}
  </F.TpkInput>

  <button type="submit">Soumettre</button>
</TpkForm>
```

### 5. Comportement de validation

#### Validation Réactive (Défaut)

Quand `@reactive={{true}}` (défaut), les champs sont validés dès que leurs valeurs changent :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @reactive={{true}}
  as |F|
>
  {{! Le champ se valide à chaque changement }}
  <F.TpkInputPrefab @label="Email" @validationField="email" />
</TpkForm>
```

#### Validation uniquement à la soumission

Définissez `@reactive={{false}}` pour valider uniquement quand le formulaire est soumis :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @reactive={{false}}
  as |F|
>
  {{! Le champ se valide uniquement à la soumission }}
  <F.TpkInputPrefab @label="Email" @validationField="email" />
</TpkForm>
```

### 6. Gestion des erreurs et scroll automatique

Contrôlez l'effacement des erreurs et le comportement de scroll automatique :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @removeErrorsOnSubmit={{true}}
  @autoScrollOnError={{true}}
  as |F|
>
  {{! Erreurs effacées avant validation, scroll vers la première erreur }}
  <F.TpkInputPrefab @label="Champ 1" @validationField="field1" />
  <F.TpkInputPrefab @label="Champ 2" @validationField="field2" />
</TpkForm>
```

### 7. État désactivé

Désactivez tout le formulaire et tous ses inputs :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @disabled={{this.isLoading}}
  as |F|
>
  {{! Tous les inputs seront désactivés quand isLoading est true }}
  <F.TpkInputPrefab @label="Nom" @validationField="name" />
</TpkForm>
```

### 8. Travailler avec les champs requis

Accédez à la liste des champs requis depuis le schéma de validation :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  <p>Champs requis : {{F.requiredFields.length}}</p>

  <F.TpkInputPrefab @label="Nom" @validationField="name" />

  {{#if (includes F.requiredFields "email")}}
    <p class="hint">L'email est requis</p>
  {{/if}}
  <F.TpkEmailPrefab @label="Email" @validationField="email" />
</TpkForm>
```

### 9. Helper changesetGet

Utilisez le helper `changesetGet` pour récupérer des valeurs sans répéter l'argument `@changeset` :

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  as |F|
>
  <F.TpkInputPrefab @label="Prénom" @validationField="firstName" />
  <F.TpkInputPrefab @label="Nom" @validationField="lastName" />

  <p>Nom complet : {{F.changesetGet "firstName"}} {{F.changesetGet "lastName"}}</p>
</TpkForm>
```

### 10. Exemple de formulaire complexe

```typescript
// Controller
import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, number, boolean, date } from 'zod';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ComplexFormController extends Controller {
  @tracked isSubmitting = false;

  changeset = new ImmerChangeset({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: null,
    country: null,
    subscribe: false,
  });

  validationSchema = object({
    firstName: string().min(2),
    lastName: string().min(2),
    email: string().email(),
    phone: string().optional(),
    birthday: date(),
    country: string().min(2),
    subscribe: boolean(),
  });

  countryOptions = [
    { label: 'Belgique', value: 'BE' },
    { label: 'France', value: 'FR' },
    { label: 'Pays-Bas', value: 'NL' },
  ];

  @action
  async handleSubmit(validatedData, changeset) {
    this.isSubmitting = true;
    try {
      await this.saveUser(validatedData);
      alert('Utilisateur sauvegardé avec succès!');
    } catch (error) {
      console.error('Échec de la sauvegarde:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
```

```gts
{{! Template }}
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.handleSubmit}}
  @disabled={{this.isSubmitting}}
  class="user-form"
  as |F|
>
  <div class="form-row">
    <F.TpkInputPrefab
      @label="Prénom"
      @validationField="firstName"
    />
    <F.TpkInputPrefab
      @label="Nom"
      @validationField="lastName"
    />
  </div>

  <F.TpkEmailPrefab
    @label="Adresse Email"
    @validationField="email"
  />

  <F.TpkMobilePrefab
    @label="Numéro de téléphone"
    @validationField="phone"
  />

  <F.TpkDatepickerPrefab
    @label="Date de naissance"
    @validationField="birthday"
  />

  <F.TpkSelectPrefab
    @label="Pays"
    @validationField="country"
    @options={{this.countryOptions}}
  />

  <F.TpkCheckboxPrefab
    @label="S'abonner à la newsletter"
    @validationField="subscribe"
  />

  <button
    type="submit"
    class="button primary"
    disabled={{this.isSubmitting}}
  >
    {{if this.isSubmitting "Sauvegarde..." "Sauvegarder l'utilisateur"}}
  </button>
</TpkForm>
```

## Personnalisation des composants par défaut

Les composants yieldés par défaut sont les composants de validation standard (`TpkValidation*`), mais vous pouvez changer ces composants par défaut en modifiant les valeurs dans le service TpkForm.

```typescript
let tpkFormService = this.owner.lookup('service:tpk-form') as TpkFormService;

// Composants de base
tpkFormService.TpkInput = CustomInput;
tpkFormService.TpkTextarea = CustomTextarea;
tpkFormService.TpkSelect = CustomSelect;
tpkFormService.TpkCheckbox = CustomCheckbox;
tpkFormService.TpkRadio = CustomRadio;
tpkFormService.TpkRadioGroup = CustomRadioGroup;
tpkFormService.TpkFile = CustomFile;
tpkFormService.TpkDatepicker = CustomDatepicker;

// Composants Prefab
tpkFormService.TpkInputPrefab = CustomInputPrefab;
tpkFormService.TpkTextareaPrefab = CustomTextareaPrefab;
tpkFormService.TpkSelectPrefab = CustomSelectPrefab;
tpkFormService.TpkSelectCreatePrefab = CustomSelectCreatePrefab;
tpkFormService.TpkSelectSearchPrefab = CustomSelectSearchPrefab;
tpkFormService.TpkCheckboxPrefab = CustomCheckboxPrefab;
tpkFormService.TpkRadioPrefab = CustomRadioPrefab;
tpkFormService.TpkRadioGroupPrefab = CustomRadioGroupPrefab;
tpkFormService.TpkDatepickerPrefab = CustomDatepickerPrefab;
tpkFormService.TpkDatepickerRangePrefab = CustomDatepickerRangePrefab;
tpkFormService.TpkTimepickerPrefab = CustomTimepickerPrefab;

// Inputs Prefab Spécialisés
tpkFormService.TpkPasswordPrefab = CustomPasswordPrefab;
tpkFormService.TpkEmailPrefab = CustomEmailPrefab;
tpkFormService.TpkIbanPrefab = CustomIbanPrefab;
tpkFormService.TpkBicPrefab = CustomBicPrefab;
tpkFormService.TpkVatPrefab = CustomVatPrefab;
tpkFormService.TpkNationalNumberPrefab = CustomNationalNumberPrefab;
tpkFormService.TpkCurrencyPrefab = CustomCurrencyPrefab;
tpkFormService.TpkIntegerPrefab = CustomIntegerPrefab;
tpkFormService.TpkNumberPrefab = CustomNumberPrefab;
tpkFormService.TpkMobilePrefab = CustomMobilePrefab;
tpkFormService.TpkFilePrefab = CustomFilePrefab;
```

Cette personnalisation vous permet de remplacer les composants par défaut par vos propres implémentations tout en conservant la structure et le comportement du formulaire.

## Fonctionnalités clés

1. **Validation automatique**: S'intègre parfaitement avec les schémas Zod pour des règles de validation complètes.
2. **Gestion des erreurs**: Affiche automatiquement les erreurs de validation et les efface au besoin.
3. **Intégration Changeset**: Utilise `ember-immer-changeset` pour une gestion d'état efficace et le suivi des changements.
4. **Bibliothèque riche de composants**: Fournit 30+ composants input pré-configurés pour les cas d'usage courants.
5. **Validation flexible**: Supporte les modes de validation réactive (on-change) et uniquement à la soumission.
6. **Accessibilité**: Scroll automatique vers les erreurs et gestion appropriée des états de focus.
7. **Sécurité de typage**: Support complet TypeScript avec paramètres de type génériques pour l'inférence de schéma.
8. **Personnalisable**: Peut remplacer les composants par défaut via le service TpkForm.

## Notes importantes

- Le callback `@onSubmit` n'est exécuté que quand le formulaire est valide.
- Par défaut, le changeset est automatiquement exécuté (changements appliqués) avant d'appeler `@onSubmit`. Définissez `@executeOnValid={{false}}` pour empêcher cela.
- Tous les composants yieldés sont pré-liés avec le changeset, l'état disabled et la liste des champs requis.
- Le schéma de validation doit utiliser Zod (pas Yup, qui était utilisé dans les anciennes versions).
- Les noms de champs dans le schéma de validation doivent correspondre aux valeurs `@validationField` utilisées dans les inputs du formulaire.
- Le composant gère automatiquement le calcul des champs requis basé sur le schéma Zod et met à jour la liste quand les données changent.
