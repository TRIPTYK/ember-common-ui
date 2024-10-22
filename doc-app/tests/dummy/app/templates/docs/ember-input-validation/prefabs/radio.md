# RadioButton

Text

<DocsDemo as |demo|>
  <demo.example @name="tpk-validation-prefab-radio.hbs">
    <Prefabs::TpkValidationRadio
      @label={{'daddy'}}
      @changeset={{this.changeset}}
      @validationField='familly'
      @mandatory={{true}}
      @onChange={{this.onChange}}
      />
    <Prefabs::TpkValidationRadio
    @label={{'mummy'}}
    @changeset={{this.changeset}}
    @validationField='familly'
    @mandatory={{true}}
    @onChange={{this.onChange}}
    />
    <Prefabs::TpkValidationRadio
      @label={{'baby'}}
      @changeset={{this.changeset}}
      @validationField='familly'
      @mandatory={{true}}
      @onChange={{this.onChange}}
      />

      selected : {{changeset-get this.changeset 'familly'}}
  </demo.example>
  <demo.snippet @name="tpk-validation-prefab-radio.hbs"/>
</DocsDemo>