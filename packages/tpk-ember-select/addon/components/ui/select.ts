import Component from '@glimmer/component';
import { SelectOption } from './interfaces';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
interface UiSelectArgs {
    options: SelectOption[],
    select:()=>{},
    updateValue:any
}
interface AdvancedMouseEvent extends MouseEvent{
    path:[]
}
export default class UiSelect extends Component<UiSelectArgs> {
    
    @tracked isOpen = false;
    @tracked selectedOption : SelectOption;
    buttonElement?: HTMLElement=undefined;

    constructor(owner:unknown,args:UiSelectArgs){
        super(owner,args);
        this.selectedOption=this.args.options[0];
    }

    @action
    toggleOptions(){
        this.isOpen = !this.isOpen;
    }
    @action
    closeOptions() {
      this.isOpen = false;
    }

    @action
    setSelectedOption(item:SelectOption){
        this.selectedOption = item;
        this.closeOptions();
        this.args.updateValue(item.value);
    }

    @action
    handleClickOutside(e:AdvancedMouseEvent) {
      for (let i = 0; i < e.path?.length; i++) {
        if (e.path[i] === this.buttonElement) {
          return true;
        }
      }
      this.closeOptions();
      return true;
    }
    @action
    registerButtonElement(element:HTMLElement){
        this.buttonElement = element;
    }
}
