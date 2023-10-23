# TpkDatepicker

A composable date picker component. Uses flatpickr under the hood.


<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker.hbs">
      <TpkDatepicker @onChange={{this.setDate}} @label="Date" @value={{this.date}} as |D|>
          <D.Label />
          <D.Input />
    </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>
