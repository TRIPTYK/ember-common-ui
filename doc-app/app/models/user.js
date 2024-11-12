import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr() email;
  @attr() firstName;
  @attr() lastName;
  @attr() phone;
  @attr() job;
  @attr() country;
}
