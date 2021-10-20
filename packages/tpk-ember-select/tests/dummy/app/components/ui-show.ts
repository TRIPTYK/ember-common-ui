
import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
    @tracked value = '';
  
    options = [{ id:1,text: "stephane meermans", value: 1 }, {id:2,
      text: "gilles Bertrand",
      value: 5678,
    }];
    @action
    setValue(value:any){
      console.log('update value', value)
      this.value= value;
    }
}
