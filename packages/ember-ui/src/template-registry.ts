import TpkConfirmModalCancelComponent from './components/tpk-confirm-modal/cancel';
import TpkConfirmModalConfirmComponent from './components/tpk-confirm-modal/confirm';
import TpkModalContentComponent from './components/tpk-modal/content';
import LoadingIndicator from './components/loading-indicator';
import TpkActionsMenuComponent from './components/tpk-actions-menu';
import TpkModalComponent from './components/tpk-modal';
import TableGenericPaginationComponent from './components/table-generic/pagination';
import TableGenericBodyActionComponent from './components/table-generic/body/action';
import TableGenericBodyActionMenuComponent from './components/table-generic/body/action-menu';
import TableGenericBodyCellComponent from './components/table-generic/body/cell';
import TableGenericBodyComponent from './components/table-generic/body';
import TableGenericSearchBarComponent from './components/table-generic/search-bar';
import TableGenericHeaderComponent from './components/table-generic/header';
import TableGenericFooterComponent from './components/table-generic/footer';
import TableGenericHeaderCellComponent from './components/table-generic/header/cell';
import TableGenericTableComponent from './components/table-generic/table';
import TpkStepperStepComponent from './components/tpk-stepper/step';
import TpkStepperStepperComponent from './components/tpk-stepper/stepper';
import TpkConfirmModalComponent from './components/tpk-confirm-modal';
import TpkStepperStepHeaderComponent from './components/tpk-stepper/step/header';
import TableGenericComponent from './components/table-generic';
import TpkStepperComponent from './components/tpk-stepper';
import TpkStackListHeadComponent from './components/tpk-stack-list/head';
import StackListItemComponent from './components/tpk-stack-list/item';
import TpkStackListContentComponent from './components/tpk-stack-list/content';
import TpkActionsMenuElementComponent from './components/tpk-actions-menu/element';
import TpkStackListTitleComponent from './components/tpk-stack-list/title';

export interface Registry {
  'tpk-actions-menu/element': typeof TpkActionsMenuElementComponent;
  'tpk-stack-list/title': typeof TpkStackListTitleComponent;
  'tpk-stack-list/content': typeof TpkStackListContentComponent;
  'tpk-stack-list/item': typeof StackListItemComponent;
  'TpkStackList::Item': typeof StackListItemComponent;
  'tpk-stack-list/head': typeof TpkStackListHeadComponent;
  'TpkStackList::Head': typeof TpkStackListHeadComponent;
  'tpk-stepper': typeof TpkStepperComponent;
  'table-generic': typeof TableGenericComponent;
  TpkTableGeneric: typeof TableGenericComponent;
  'tpk-confirm-modal/cancel': typeof TpkConfirmModalCancelComponent;
  'tpk-confirm-modal/confirm': typeof TpkConfirmModalConfirmComponent;
  'tpk-modal/content': typeof TpkModalContentComponent;
  'loading-indicator': typeof LoadingIndicator;
  LoadingIndicator: typeof LoadingIndicator;
  'tpk-actions-menu': typeof TpkActionsMenuComponent;
  TpkActionsMenu: typeof TpkActionsMenuComponent;
  'tpk-modal': typeof TpkModalComponent;
  TpkModal: typeof TpkModalComponent;
  'table-generic/pagination': typeof TableGenericPaginationComponent;
  'TableGeneric::Pagination': typeof TableGenericPaginationComponent;
  'table-generic/body/action': typeof TableGenericBodyActionComponent;
  'table-generic/body/action-menu': typeof TableGenericBodyActionMenuComponent;
  'table-generic/body/cell': typeof TableGenericBodyCellComponent;
  'table-generic/body': typeof TableGenericBodyComponent;
  'table-generic/search-bar': typeof TableGenericSearchBarComponent;
  'TableGeneric::SearchBar': typeof TableGenericSearchBarComponent;
  'table-generic/footer': typeof TableGenericFooterComponent;
  'table-generic/header': typeof TableGenericHeaderComponent;
  'table-generic/table': typeof TableGenericTableComponent;
  'table-generic/header/cell': typeof TableGenericHeaderCellComponent;
  'tpk-stepper/step/header': typeof TpkStepperStepHeaderComponent;
  'tpk-stepper/step': typeof TpkStepperStepComponent;
  'tpk-stepper/stepper': typeof TpkStepperStepperComponent;
  'tpk-confirm-modal': typeof TpkConfirmModalComponent;
}
