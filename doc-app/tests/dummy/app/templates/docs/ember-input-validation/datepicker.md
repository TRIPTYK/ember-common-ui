# Ember input validation/datepicker

Ember input validation/datepicker content

<DocsDemo as |demo|>
  <demo.example @name="datepicker-validation-src.hbs">
  <!-- <TpkDatepicker  @label="Date"  @value={{this.date}} as |T|>
          <T.Label />
          <T.Input />
    </TpkDatepicker> -->
    <TpkValidationDatepicker 
    @label={{this.label}} 
    @changeset={{this.changeset}}
    @validationField="date"
    as |D|>
        <D.Label />
        <D.Input />
        <!-- <div>
        {{#each D.errors as |error|}}
          <span>
              {{error.message}}
          </span>
        {{/each}}
      </div> -->      
    </TpkValidationDatepicker>
  </demo.example>
  <demo.snippet @name="datepicker-validation-src.hbs"/>
</DocsDemo>
