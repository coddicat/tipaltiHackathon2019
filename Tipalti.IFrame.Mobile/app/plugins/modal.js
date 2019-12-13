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
        Vue.prototype.$listPicker = async function ({ title, list, selected }) {
            var res = await this.$showModal(ModalListPicker, { 
                fullscreen: false, 
                props: { 
                    list: list, 
                    selected: selected 
                }
            });
            return res;            
        };
    }
}