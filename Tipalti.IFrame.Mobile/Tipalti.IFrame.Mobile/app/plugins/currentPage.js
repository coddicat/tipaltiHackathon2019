import { SET_CURRENT_PAGE } from '~/consts/storeConst';

export default {
    install(Vue) {
        Vue.mixin({
            mounted: function() {
                if(this.$options.page) {
                    this.$store.dispatch(SET_CURRENT_PAGE, this.$options.page);
                }
            }
        });
        Vue.prototype.$setCurrentPage = function () {
            if(this.$options.page) {
                this.$store.dispatch(SET_CURRENT_PAGE, this.$options.page);
            }
        }        
    }
}