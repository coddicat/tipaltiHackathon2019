import { getRootView } from "tns-core-modules/application"
//import { Frame } from "tns-core-modules/ui/frame";
const showDrawer = () => {
    const drawerNativeView = getRootView();
    if (drawerNativeView && drawerNativeView.showDrawer) {
        drawerNativeView.showDrawer();
    }
}

const closeDrawer = () => {
    const drawerNativeView = getRootView();
    if (drawerNativeView && drawerNativeView.closeDrawer) {
        drawerNativeView.closeDrawer();
    }
}

export default {
    install(Vue) {
        Vue.prototype.$showDrawer = () => {
            showDrawer();
        };
        Vue.prototype.$closeDrawer = () => {
            closeDrawer();
        };
    }
}