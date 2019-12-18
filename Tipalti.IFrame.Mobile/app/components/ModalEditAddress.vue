<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Invoice info">
            <NavigationButton 
                android.systemIcon="ic_menu_close_clear_cancel" @tap="onClose">
            </NavigationButton>
            <ActionItem @tap="onSave" android.systemIcon="ic_menu_save" :visibility="loading || noChanges ? 'collapsed' : 'visible'">
            </ActionItem>
        </ActionBar>
        <GridLayout rows="*">

            <ScrollView row="0" :visibility="loading ? 'collapsed' : 'visible'">
                <StackLayout>
                    <GridLayout rows="auto, auto">
                        <StackLayout row="0" style="padding: 10">
                            <Label textWrap="true" text="Please enter your details as they appear on your bank records. P.O. Box is not allowed" ></Label>
                            <StackLayout orientation="horizontal">
                                <Label text.decode="&#xf05a;" class="fas" color="#00f"></Label>
                                <Label textWrap="true" style="margin-left: 2" text="If your bank records include P.O. Box, please insert your physical address."></Label>
                            </StackLayout>                        
                        </StackLayout>
                        <StackLayout row="1" class="settings__form">
                            <FormSelect title="Type" v-model="editableForm.PayeeEntityType" :list="['Company', 'Individual']">                            
                            </FormSelect>
                            <FormInputValue keyboardType="email" title="Contact Email" v-model="editableForm.EmailAddress"></FormInputValue>
                            <FormInputValue title="First Name" v-model="editableForm.FirstName"></FormInputValue>
                            <FormInputValue title="Middle Name" v-model="editableForm.MiddleName"></FormInputValue>
                            <FormInputValue title="Last Name" v-model="editableForm.LastName"></FormInputValue>
                            <FormInputValue title="Company" v-model="editableForm.Company"
                                :visibility="editableForm.PayeeEntityType === 'Company' ? 'visible' : 'collapsed'"></FormInputValue>
                            <FormInputText title="Address" v-model="editableForm.Address"></FormInputText>
                            <FormInputText title="Address 2" v-model="editableForm.Address2"></FormInputText>
                            
                            <FormInputValue title="City" :value="editableForm.City"></FormInputValue>
                            <FormInputValue title="Zip" :value="editableForm.Zip"></FormInputValue>
                            
                            <FormSelect title="Country" v-model="editableForm.Country" :list="coutries"
                                :getValueFunc="(x) => x.value" :getDisplayFunc="(x) => x.display">
                            </FormSelect>                        

                        </StackLayout>
                    </GridLayout>
                </StackLayout>
            </ScrollView>        

            <ActivityIndicator row="0" col="0" 
                :busy="loading"
                class="activity-indicator">
            </ActivityIndicator> 

        </GridLayout>

    </Page>    
</template>
<script>
import { CONFIRM_DETAILS_CHANGED } from '~/consts/consts';
import { GET_LOADING, GET_SETTINGS_FIRST_STEP_STATIC_DATA, SET_LOADING } from '~/consts/storeConst'; 
import { mapGetters, mapActions } from 'vuex';
import { SETTINGS_VALIDATE_ADDRESS, SAVE_SETTINGS_FIRST_STEP } from '~/consts/apiConsts';
import api from '~/api';
import FormInputText from '~/components/FormControls/FormInputText';
import FormInputValue from '~/components/FormControls/FormInputValue';
import FormSelect from '~/components/FormControls/FormSelect';
var dialogs = require("tns-core-modules/ui/dialogs");

export default {
    props: {
        form: Object
    },
    data() {
        return {
            editableForm: {}
        }
    },
    computed: {
        ...mapGetters({
            staticData: GET_SETTINGS_FIRST_STEP_STATIC_DATA,
            loading: GET_LOADING,  
        }),        
        coutries(){
            if(this.staticData && this.staticData.Countries) {
                const countries = this.staticData.Countries;                
                var arr = Object.keys(countries).map(i => { return { value: i, display: countries[i] } });
                return arr;
            }
            return []
        },
        noChanges() {
            return JSON.stringify(this.form) === JSON.stringify(this.editableForm);
        }
    },
    methods: {
        ...mapActions({ setLoading: SET_LOADING }),
        onClose() {
            this.$navigateBack();
        },
        async onSave() {
            const payload = {
                Street1: this.editableForm.Address,
                Street2: this.editableForm.Address2,
                City: this.editableForm.City,
                State: '',
                Zip: this.editableForm.Zip,
                Country: this.editableForm.Country,
            };

            try {
                this.setLoading(true);
                const response = await api.get(SETTINGS_VALIDATE_ADDRESS, payload);                
                await this.onAddressValidated(response);
            } catch (error) {
                dialogs.alert(error);
            } finally {
                this.setLoading(false);
            }
        },    
        async onAddressValidated(response) {
            if(response.status != 200) {
                throw response.statusText;
            }
            if(response.data && response.data.AddressValidationsResult) {
                throw response.data.AddressValidationsResult.join(';');
            }                
            const res = await dialogs.confirm(CONFIRM_DETAILS_CHANGED);
            if(res) {
                await this.toSaveData();
                this.$navigateBack();
            }
        },
        async toSaveData() {
            try {
                this.setLoading(true);
                const payload = this.editableForm;
                
                //temporary, should be implemented
                payload.PaymentCountry = payload.Country;
                payload.PayeeEntityTypeEnum = payload.PayeeEntityType;
                //------------------
                
                const response = await api.post(SAVE_SETTINGS_FIRST_STEP, { step: 'ContactDetails' }, payload);
                if(response.status != 200) {
                    throw response.statusText;
                }
                if(response.data && !response.data.Succeeded) {
                    if(response.data.Errors) {
                        const arr = Object.keys(response.data.Errors).map(i => { return `${i}: ${response.data.Errors[i].join(',')}` });
                        throw arr.join(';');
                    }
                
                    throw 'Unknow error';                    
                }      
            } catch (error) {                
                dialogs.alert(error);                
            } finally {
                this.setLoading(false);
            }            
        }
    },
    mounted() {
        this.editableForm = JSON.parse(JSON.stringify(this.form));
    },
    components: {
        FormInputText, FormInputValue, FormSelect
    }
}
</script>