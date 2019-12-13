import * as app from "application";    
import { SET_ORIENTATION } from '~/consts/storeConst'; 

const init = {
    store: null
}

export default {
    install(Vue) {
        app.on(app.orientationChangedEvent, (args) => {
            init.store.dispatch(SET_ORIENTATION, args.newValue);            
        });
        Vue.prototype.$initOrientation = function() {
            init.store = this.$store;
            const orientation = app.orientation();
            init.store.dispatch(SET_ORIENTATION, orientation);
        };
    }
}