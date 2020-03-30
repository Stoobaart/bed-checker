import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class QrRoute extends Route {
  @service account;

  beforeModel() {
    this.account.hospital = null;
  }
}