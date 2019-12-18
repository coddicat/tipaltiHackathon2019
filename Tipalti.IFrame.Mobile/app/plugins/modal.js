import ModalAlert from '@/components/ModalAlert';
import ModalListPicker from '@/components/ModalListPicker';
export default {
    install(Vue) {
        Vue.prototype.$alert = async function({ text, title }) {
            await this.$showModal(ModalAlert, { 
                fullscreen: false, 
                props: {
                    text: text,
                    title: title
                }
            });
        };
        Vue.prototype.$listPicker = async function (props) {
            var res = await this.$showModal(ModalListPicker, { 
                fullscreen: false, 
                props: props
            });
            return res;            
        };
    }
}