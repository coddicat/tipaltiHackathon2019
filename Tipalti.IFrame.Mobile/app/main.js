import Vue from "nativescript-vue";
import App from "~/App";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import store from '~/store';
import DrawerPlugin from '~/plugins/drawer';
import CurrentPagePlugin from '~/plugins/currentPage';
import ModalPlugin from '~/plugins/modal';
import api from '~/api';
import moment from 'moment';
import RipplePlugin from 'nativescript-material-ripple/vue';
import RadListView from 'nativescript-ui-listview/vue';
import tokenService from '@/tokenService';

import Settings from "./pages/Settings";
import DrawerContent from "./components/DrawerContent";


Vue.use(ModalPlugin);
Vue.use(RadListView);
Vue.use(RipplePlugin);
Vue.use(DrawerPlugin);
Vue.use(CurrentPagePlugin);
Vue.use(RadSideDrawer);
Vue.config.silent = (TNS_ENV === 'production');

// api.settings.baseURL = "http://10.16.0.177:45455";
//api.settings.baseURL = "http://192.168.1.161:45455";
api.settings.baseURL = "http://newiframe.payrad.com";
tokenService.setTokenAsync();

Vue.filter('formatDate', function(value) {
  if (value) {
    //Sat, Mar 16 2019 24:00
    //return moment.utc(String(value)).local().format('ddd, MMM DD YYYY, HH:mm')

    //Mar 16 2019
    return moment.utc(String(value)).local().format('MMM DD YYYY')
  }
});
Vue.filter('decimal', function(value) {
  return (Math.round(value * 100) / 100).toFixed(2);
});
Vue.filter('amount', function(value) {
  const currency = value.Currency;
  const amount = value.Amount;
  return currency + ' ' + (Math.round(amount * 100) / 100).toFixed(2);
});

//Vue.config.silent = true;
//Vue.productionTip = true;

new Vue({
  store,
  render (h) {
      return h(
        App,
        [
          h(DrawerContent, { slot: 'drawerContent' }),
          h(Settings, { slot: 'mainContent' })
        ]
      )
    }
  }).$start();

