import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

// const DASHBOARD_ROUTES = [
//   'home',
//   'qr'
// ];

export default class extends Route {
  @service router;

  @action
  didTransition() {
    super.init(...arguments);

    window.scrollTo(0,0);
    // const isQrRoute = DASHBOARD_ROUTES.some((route) => this.router._router.url.includes(route));
    const hasToken = JSON.parse(localStorage.getItem('bed_tracker_token'));
    // const isManager = JSON.parse(localStorage.getItem('hospital_manager'));

    const isDetectifyRoute = this.router._router.url === '/4a2b2d7c58df5c43d63986fb23385307.txt';
    if (!hasToken && !isDetectifyRoute) {
      // if (isQrRoute) {
      //   this.transitionTo('/qr');
      // } else {
        this.transitionTo('/');
      // }
    }

    // if (hasToken && !isManager) {
    //   if (this.router._router.url.includes('dashboard')) {
    //     this.transitionTo('/');
    //   }
    // }
  }
}
