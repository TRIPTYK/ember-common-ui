import {
  attribute,
  clickable,
  collection,
  create,
  property,
  triggerable,
} from 'ember-cli-page-object';
import { findOne } from 'ember-cli-page-object/extend';
import { getter } from 'ember-cli-page-object/macros';

export default create({
  scope: '.tpk-select',
});
