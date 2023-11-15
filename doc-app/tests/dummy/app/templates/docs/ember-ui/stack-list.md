# Stack list

Stack list content

<DocsDemo as |demo|>
    <demo.example @name="stack-list-src.hbs">
        <TpkStackList
        @data={{this.data}}
        @onRemove={{this.onRemoveData}}
        @onAdd={{this.onAddData}}
        @titleForAdd={{this.titleForAdd}}
        as |S|
      >
        <S.Title as |T|>
          title - {{T.item}}
        </S.Title>
        <S.Content as |C|>
          content - {{C.item}} - {{ C.index }}
        </S.Content>
      </TpkStackList>
    </demo.example>
    <demo.snippet @name="stack-list-src.hbs" />
</DocsDemo>

### Args

**@titleForAdd**: A string parameter representing the label displayed beside the plus icon within the button.

**@onAdd**: A function parameter. This is function called when you click the 
"add element to list" button. This function should add an element to the array
used as the data args.

**@onRemove**: A function parameter. This is function called when you click the 
thrash icon in the "element added" header. This function should remove an element from the array.

**@data**: An array parameter. It represents the array that contains each element displayed in the stack-list. If there's no element, nothing is displayed except the "add element to list" button.


### Yields

**S.Title**: The HTML element that is displayed when the stack list element is closed. You can use T.item within S.title. item is an element of the array

**S.Content**: The HTML element that is displayed when the stack list element is opened. You can use C.item within S.content. item is an element of the array. Also, you can use C.index which is the index of the array element.

### CSS

**[data-is-expanded="true"]**: CSS class applied to S.Content div when the element is opened. It has to be implemented because otherwise, you can't see the difference between closed/opened element.

**[data-is-expanded="false"]**: CSS class applied to S.Content div when the element is closed. It has to be implemented because otherwise, you can't see the difference between closed/opened element.
