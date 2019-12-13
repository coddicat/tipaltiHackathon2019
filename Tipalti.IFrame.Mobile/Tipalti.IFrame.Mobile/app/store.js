import Vue from "vue";
import Vuex from 'vuex';
import * as storeConsts from '~/consts/storeConst';
import * as apiConsts from '~/consts/apiConsts';
import api from '~/api';
import tokenService from '@/tokenService';

Vue.use(Vuex)
export default new Vuex.Store({
    strict: true,    
    state: {
        currentPage: null,        
        orientation: null,
        loading: false,
        invoicesHistory: {},
        settingsFirstStep: {
            FirstStep: {
                Data: {}
            },
            StaticData: {
                Countries: {}
            }
        }
    },
    mutations: {
        [storeConsts.MUTATE_CURRENT_PAGE]: (state, payload) => state.currentPage = payload,
        [storeConsts.MUTATE_ORIENTATION]: (state, payload) => state.orientation = payload,
        [storeConsts.MUTATE_LOADING]: (state, payload) => state.loading = payload,
        [storeConsts.MUTATE_INVOICE_HISTORY]: (state, payload) => state.invoicesHistory = payload,
        [storeConsts.MUTATE_SETTINGS_FIRST_STEP]: (state, payload) => Vue.set(state, 'settingsFirstStep', payload)
    },
    actions: {
        [storeConsts.SET_CURRENT_PAGE]: ({ commit }, payload) => commit(storeConsts.MUTATE_CURRENT_PAGE, payload),
        [storeConsts.SET_ORIENTATION]: ({ commit }, payload) => commit(storeConsts.MUTATE_ORIENTATION, payload),
        [storeConsts.LOAD_INVOICE_HISTORY]: async ({ commit, state }, pageCount) => {
            try {                    
                commit(storeConsts.MUTATE_LOADING, true);
                await tokenService.readyPromise;                
                const payload = {PageSize: 10, PageCount: pageCount, SortBy: null, SortDirection: null, Filters: []};
                const response = await api.post(apiConsts.LOAD_INVOICE_HISTORY, null, payload, null);          
                if(response.status != 200) {
                    throw response;
                }

                if(pageCount > 1) {
                    const items = [...state.invoicesHistory.Data, ...response.data.Data];
                    response.data.Data = items;
                }
                commit(storeConsts.MUTATE_INVOICE_HISTORY, response.data);
                commit(storeConsts.MUTATE_LOADING, false);
            } catch (error) {
                console.log(error);
            } finally {
                commit(storeConsts.MUTATE_LOADING, false);
            }
        },
        [storeConsts.LOAD_SETTINGS_FIRST_STEP]: async ({ commit, state }) => {
            try {                    
                commit(storeConsts.MUTATE_LOADING, true);
                await tokenService.readyPromise;                
                const response = await api.get(apiConsts.LOAD_SETTINGS_FIRST_STEP);          
                if(response.status != 200) {
                    throw response;
                }
                commit(storeConsts.MUTATE_SETTINGS_FIRST_STEP, response.data);
                commit(storeConsts.MUTATE_LOADING, false);
            } catch (error) {
                console.log(error);
            } finally {
                commit(storeConsts.MUTATE_LOADING, false);
            }
        }
    },
    getters: {
        [storeConsts.GET_CURRENT_PAGE]: (state) => state.currentPage,
        [storeConsts.GET_ORIENTATION]: (state) => state.orientation,
        [storeConsts.GET_LOADING]: (state) => state.loading,
        [storeConsts.GET_INVOICE_HISTORY]: (state) => state.invoicesHistory,
        [storeConsts.GET_SETTINGS_FIRST_STEP_DATA]: (state) => state.settingsFirstStep.FirstStep.Data,
        [storeConsts.GET_SETTINGS_FIRST_STEP_STATIC_DATA]: (state) => state.settingsFirstStep.StaticData,
    }
});