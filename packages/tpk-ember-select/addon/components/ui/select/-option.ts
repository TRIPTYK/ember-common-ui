import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SelectOption } from '../interfaces';

interface UiSelectOptionArgs {
    setSelectedOptionIn:any,
    option:SelectOption,
    selectedOption:SelectOption
}

export default class UiSelectOption extends Component<UiSelectOptionArgs> {

    @tracked guid = `${guidFor(this)}-TPK-listbox-option`
    @action
    handleClick(e:MouseEvent){
        e.preventDefault();
        e.stopPropagation();
        this.args.setSelectedOptionIn(this.args.option)
    }
    
    get selected(){
        return this.args.option === this.args.selectedOption ;
    }
}
