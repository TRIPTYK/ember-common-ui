# Ember input validation/datepicker

Ember input validation/datepicker content

<DocsDemo as |demo|>
  <demo.example @name="datepicker-validation-src.hbs">
  {{log (changeset-get this.changeset "date")}}
    <TpkValidationDatepicker 
    @label={{this.label}} 
    @changeset={{this.changeset}}
    @validationField="date"
    as |T|>
        <T.Input />
        <T.Label />
        <div>
        {{#each T.errors as |error|}}
          <span>
              {{error.message}}
          </span>
        {{/each}}
      </div>
    </TpkValidationDatepicker>
  </demo.example>
  <demo.snippet @name="datepicker-validation-src.hbs"/>
</DocsDemo>
