import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') email!: string;
  @attr('string') firstName!: string;
  @attr('string') lastName!: string;
  @attr('string') phone!: string;
  @attr('string') job!: string;
  @attr('string') country!: string;
}
