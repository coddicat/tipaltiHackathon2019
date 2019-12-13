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
            <ActionItem @tap="onEditForm" android.systemIcon="ic_menu_edit">
            </ActionItem>
        </ActionBar>

        <Tabs selectedIndex="0">
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
                <GridLayout rows="auto">                    
                    <ScrollView>
                        <StackLayout class="settings__form">
                            <GridLayout columns="auto, *">
                                <Label col="0" class="settings_form_title"
                                    text="Type"></Label>
                                <Label col="1" class="settings_form_value"
                                    :text="form.PayeeEntityType"></Label>
                            </GridLayout>
                            <GridLayout columns="auto, *">
                                <Label col="0" class="settings_form_title"
                                    text="Contact Email"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.EmailAddress"></Label>
                            </GridLayout>
                            <GridLayout columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="First Name"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.FirstName"></Label>                                                    
                            </GridLayout>
                            <GridLayout columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="Middle Name"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.MiddleName"></Label>                                                    
                            </GridLayout>
                            <GridLayout columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="Last Name"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.LastName"></Label>                                                    
                            </GridLayout>
                            <GridLayout v-if="form.PayeeEntityType === 'Company'" columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="Company"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.Company"></Label>                                                    
                            </GridLayout>
                            <GridLayout rows="auto, auto">                                
                                <Label row="0" class="settings_form_title"
                                    text="Address"></Label>
                                <Label row="1" textWrap="true" class="settings_form_value--ownline" 
                                    :text="form.Address"></Label>                                                    
                            </GridLayout>
                            <GridLayout rows="auto, auto">                                
                                <Label row="0" class="settings_form_title"
                                    text="Address2"></Label>
                                <Label row="1" textWrap="true" class="settings_form_value--ownline" 
                                    :text="form.Address2"></Label>                                                    
                            </GridLayout>
                            <GridLayout columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="City"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.City"></Label>                                                    
                            </GridLayout>
                            <GridLayout columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="Zip"></Label>
                                <Label col="1" class="settings_form_value" 
                                    :text="form.Zip"></Label>                                                    
                            </GridLayout>
                            <GridLayout columns="auto, *">                                
                                <Label col="0" class="settings_form_title"
                                    text="Country"></Label>
                                <Label col="1" textAlignment="right" 
                                    :text="country"></Label>                                                    
                            </GridLayout>
                        </StackLayout>
                    </ScrollView>

                    <ActivityIndicator row="0" rowSpan="2"
                        :busy="loading"
                        class="activity-indicator">
                    </ActivityIndicator>                         
                </GridLayout>
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
    </Page>
</template>

<script>
//import ModalListPicker from '@/components/ModalListPicker'
import { GET_LOADING, LOAD_SETTINGS_FIRST_STEP, GET_SETTINGS_FIRST_STEP_DATA, GET_SETTINGS_FIRST_STEP_STATIC_DATA } from '~/consts/storeConst'; 
import { mapGetters, mapActions } from 'vuex';
import ModalEditAddress from '~/components/ModalEditAddress';
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
            this.$showModal(ModalEditAddress, { fullscreen: true, props: { form: JSON.parse(JSON.stringify(this.form)) }});
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
};
</script>
