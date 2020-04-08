import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import CreateWard from 'bed-checker/gql/mutations/create-ward';

export default class AddWardController extends Controller {
  @service router;
  @service apollo;
  @service hospital;

  @tracked shortName = '';
  @tracked longName = '';

  @tracked error = false;

  @action
  cancel() {
    this.shortName = '';
    this.longName = '';
    this.router.transitionTo('dashboard');
  }

  @action
  async createWard(event) {
    event.preventDefault();

    this.error = false;

    const variables = {
      input: {
        shortName: this.shortName,
        longName: this.longName
      }
    };

    try {
      const { createWard } = await this.apollo.mutate({ mutation: CreateWard, variables });
      this.hospital.addWard(createWard.ward);
      this.set('model.showSuccessMessage', true);
      this.shortName = '';
      this.longName = '';
      this.router.transitionTo('dashboard');
    } catch (error) {
      this.error = true;
      console.error(error);
    }
  }
}
