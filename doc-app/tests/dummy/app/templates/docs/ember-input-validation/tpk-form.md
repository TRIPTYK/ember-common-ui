# TpkForm

The `TpkForm` component is a form component that uses the `ember-immer-changeset` and `yup` libraries to provide a simple way to create forms with validation. The form yields each component from ember-input-validation as a block component.

<DocsDemo as |demo|>
    <demo.example @name="tpk-form.hbs">
       <TpkForm @changeset={{this.changeset}} @onSubmit={{this.success}} @validationSchema={{this.validationSchema}} as |F|>
          <F.TpkInput @label="First Name" @validationField="firstName" as |I|>
            <I.Label/>
            <I.Input />
            {{#if I.errors}}
              {{#each I.errors as |error|}}
                <div>{{error.message}}</div>
              {{/each}}
            {{/if}}
          </F.TpkInput>
          <input class="mt-12" type="submit" value="Submit">
       </TpkForm>
    </demo.example>
    <demo.snippet @name="tpk-form.hbs"/>
</DocsDemo>


The default yielded component is TpkValidationInput, but you can change the default components by changing the values in the TpkForm service.

```js
    let tpkFormService = this.owner.lookup(
      'service:tpk-form',
    ) as TpkFormService;

    tpkFormService.TpkInput = DummyInput;
    tpkFormService.TpkSelect = DummySelect;
    tpkFormService.TpkCheckbox = DummyCheckbox;
    tpkFormService.TpkRadio = DummyRadio;
    tpkFormService.TpkTextarea = DummyTextarea;
    tpkFormService.TpkDatePicker = DummyDatepicker;
    tpkFormService.TpkFile = DummyFile;
```
