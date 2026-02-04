export const tpkForm = `
    <TpkForm
      @changeset={{this.changeset}}
      @onSubmit={{this.handleSubmit}}
      @validationSchema={{this.validationSchema}}
      as |F|
    >
      <F.TpkInputPrefab
        @label="First Name"
        @validationField="firstName"
      />

      <F.TpkInputPrefab
        @label="Last Name"
        @validationField="lastName"
      />

      <F.TpkEmailPrefab
        @label="Email"
        @validationField="email"
      />

      <button class="button" type="submit">Submit</button>
    </TpkForm>
  `;

export const baseComponentsExample = `
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      as |F|
    >
      <F.TpkInput
        @label="Username"
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

      <button type="submit">Submit</button>
    </TpkForm>
  `;

export const reactiveValidationExample = `
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      @reactive={{true}}
      as |F|
    >
      {{! Field validates on every change }}
      <F.TpkInputPrefab @label="Email" @validationField="email" />
    </TpkForm>
  `;

export const submitOnlyValidationExample = `
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      @reactive={{false}}
      as |F|
    >
      {{! Field validates only on submit }}
      <F.TpkInputPrefab @label="Email" @validationField="email" />
    </TpkForm>
  `;

export const errorHandlingExample = `
  <TpkForm
    @changeset={{this.changeset}}
    @validationSchema={{this.validationSchema}}
    @onSubmit={{this.handleSubmit}}
    @removeErrorsOnSubmit={{true}}
    @autoScrollOnError={{true}}
    as |F|
  >
    {{! Errors cleared before validation, scrolls to first error }}
    <F.TpkInputPrefab @label="Field 1" @validationField="field1" />
    <F.TpkInputPrefab @label="Field 2" @validationField="field2" />
  </TpkForm>
  `;

export const disabledStateExample = `
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      @disabled={{this.isLoading}}
      as |F|
    >
      {{! All inputs will be disabled when isLoading is true }}
      <F.TpkInputPrefab @label="Name" @validationField="name" />
    </TpkForm>
  `;

export const requiredFieldsExample = `
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      as |F|
    >
      <p>Required fields: {{F.requiredFields.length}}</p>

      <F.TpkInputPrefab @label="Name" @validationField="name" />

      {{#if (includes F.requiredFields "email")}}
        <p class="hint">Email is required</p>
      {{/if}}
      <F.TpkEmailPrefab @label="Email" @validationField="email" />
    </TpkForm>
  `;

export const changesetGetExample = `
    <TpkForm
      @changeset={{this.changeset}}
      @validationSchema={{this.validationSchema}}
      @onSubmit={{this.handleSubmit}}
      as |F|
    >
      <F.TpkInputPrefab @label="First Name" @validationField="firstName" />
      <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />

      <p>Full name: {{F.changesetGet "firstName"}} {{F.changesetGet "lastName"}}</p>
    </TpkForm>
  `;
