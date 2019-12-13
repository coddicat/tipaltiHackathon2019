import api from '@/api'

const init = {
    resolver: null
};
const promise = new Promise((resolver) => {
    init.resolver = resolver;
});

export default {
    readyPromise: promise,
    async setTokenAsync() {
        try {
            //get demo view
            let response = await api.get('/demo/iframe?h=SuppliersFlow.com&idap=10000&cskin=twitter', null, null);
            if(response.status != 200) {
                throw response;
            }                
            //get iframe url from response
            const iframe = (response.data.match(/src="([^"]*)"/)[1]).toString().replace(/&amp;/g, '&');
            
            //get iframe view
            response = await api.get(iframe, null, null);
            if(response.status != 200) {
                throw response;
            }

            //get token
            const token = response.data.match(/window.token = '([^']*)'/)[1];
            api.settings.headers["AuthorizationToken"] = token;
            
            init.resolver();
        } catch (error) {
            console.log(error);
        }
    }
}