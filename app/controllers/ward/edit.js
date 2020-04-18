import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import UpdateWardMutation from 'bed-checker/gql/mutations/update-ward';
import RemoveWardMutation from 'bed-checker/gql/mutations/remove-ward';

export default class EditWardController extends Controller {
  @service router;
  @service apollo;
  @service hospital;

  @tracked name;
  @tracked description;
  @tracked isCovidWard = this.model.isCovidWard;

  @tracked showDeleteWardModal = false;

  @tracked error = false;

  @action
  toggleIsCovidWard() {
    this.isCovidWard = !this.isCovidWard;
  }

  @action
  async saveWard() {
    this.error = false;

    const variables = {
      input: {
        id: this.model.id,
        name: this.name,
        description: this.description,
        isCovidWard: this.isCovidWard
      }
    };

    try {
      await this.apollo.mutate({ mutation: UpdateWardMutation, variables });
      this.model.name = this.name;
      this.model.description = this.description;
      this.router.transitionTo('ward', this.model);
    } catch (error) {
      this.error = true;
      console.error(error);
    }
  }

  @action
  async deleteWard() {
    const variables = {
      input: {
        id: this.model.id
      }
    };

    try {
      await this.apollo.mutate({ mutation: RemoveWardMutation, variables });
      this.hospital.removeWard(this.model.id);
      this.router.transitionTo('dashboard');
    } catch (error) {
      console.error(error);
    }

    this.closeModal();
  }

  @action
  closeModal() {
    this.showDeleteWardModal = false;
  }
}
