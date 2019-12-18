<template>
    <Page class="page" @navigatedTo="navigatedTo" @loaded="onPageLoaded">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Settings"></Label>
            <ActionItem @tap="onEditForm" android.systemIcon="ic_menu_edit" :visibility="loading ? 'collapsed' : 'visible'">
            </ActionItem>
        </ActionBar>
        <GridLayout rows="*">
            <Tabs selectedIndex="0" :visibility="loading ? 'collapsed' : 'visible'">
                <TabStrip>
                    <TabStripItem>
                        <Label text="ADDRESS"></Label>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="PAYMENT METHOD"></Label>                    
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="TAX FORMS"></Label>                    
                    </TabStripItem>
                </TabStrip>

                <TabContentItem>                    
                    <ScrollView>
                        <StackLayout class="settings__form">
                            <FormValue title="Type" :value="form.PayeeEntityType"></FormValue>
                            <FormValue title="Contact Email" :value="form.EmailAddress"></FormValue>
                            <FormValue title="First Name" :value="form.FirstName"></FormValue>
                            <FormValue title="Middle Name" :value="form.MiddleName"></FormValue>
                            <FormValue title="Last Name" :value="form.LastName"></FormValue>
                            <FormValue title="Company" :value="form.Company" :visibility="form.PayeeEntityType === 'Company' ? 'visible' : 'collapsed'"></FormValue>
                            <FormText title="Address" :value="form.Address" wrap></FormText>
                            <FormText title="Address 2" :value="form.Address2" wrap></FormText>
                            <FormValue title="City" :value="form.City"></FormValue>
                            <FormValue title="Zip" :value="form.Zip"></FormValue>
                            <FormValue title="Country" :value="country"></FormValue>
                        </StackLayout>
                    </ScrollView>                    
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <Label text="PAYMENT METHOD" class="h2 text-center"></Label>
                    </GridLayout>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <Label text="TAX FORMS" class="h2 text-center"></Label>
                    </GridLayout>
                </TabContentItem>
            </Tabs>
            <ActivityIndicator
                :busy="loading"
                class="activity-indicator">
            </ActivityIndicator>                         
        </GridLayout>        
    </Page>
</template>

<script>
//import ModalListPicker from '@/components/ModalListPicker'
import { GET_LOADING, LOAD_SETTINGS_FIRST_STEP, GET_SETTINGS_FIRST_STEP_DATA, GET_SETTINGS_FIRST_STEP_STATIC_DATA } from '~/consts/storeConst'; 
import { mapGetters, mapActions } from 'vuex';
import ModalEditAddress from '~/components/ModalEditAddress';
import FormValue from '~/components/FormControls/FormValue';
import FormText from '~/components/FormControls/FormText';
export default {
    page: 'Settings',
    computed: {
        ...mapGetters({
            loading: GET_LOADING,
            form: GET_SETTINGS_FIRST_STEP_DATA,
            staticData: GET_SETTINGS_FIRST_STEP_STATIC_DATA
        }),
        country(){
            if(this.staticData && this.staticData.Countries) {
                return this.staticData.Countries[this.form.Country] || this.form.Country;
            }

            return this.form.Country;
        },
    },
    methods: {
        ...mapActions({
            loadFirstStep: LOAD_SETTINGS_FIRST_STEP
        }),
        onEditForm(){
            const copy = JSON.parse(JSON.stringify(this.form));
            this.$navigateTo(ModalEditAddress, { 
                frame: 'root-frame', 
                props: { 
                    form: copy
                } 
            });            
        },
        onDrawerButtonTap() {                
            this.$showDrawer();
        },
        navigatedTo() {
            this.$setCurrentPage();                
        },   
        async onLoad() {                
            await this.loadFirstStep();
        },
        async onPageLoaded() {                
            await this.onLoad();
        },
    },        
    components: {
        ModalEditAddress,
        FormValue,
        FormText
    }
};
</script>
