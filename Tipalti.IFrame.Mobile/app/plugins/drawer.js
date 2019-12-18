//import { getRootView } from "tns-core-modules/application"
//import { Frame } from "tns-core-modules/ui/frame";

const init = {
    drawer: null
}

const showDrawer = () => {
    //const drawerNativeView = getRootView();
    // if (drawerNativeView && drawerNativeView.showDrawer) {
    //     drawerNativeView.showDrawer();
    // }
    if(init.drawer) {
        init.drawer.showDrawer();
    }
}

const closeDrawer = () => {
    // const drawerNativeView = getRootView();
    // if (drawerNativeView && drawerNativeView.closeDrawer) {
    //     drawerNativeView.closeDrawer();
    // }
    if(init.drawer) {
        init.drawer.closeDrawer();
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
        Vue.prototype.$initDrawer = (drawer) => {
            init.drawer = drawer;
        }
    }
}