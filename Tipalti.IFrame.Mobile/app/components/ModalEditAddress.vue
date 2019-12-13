<template>
    <Frame>
    <Page class="page">
        <ActionBar class="action-bar" title="Invoice info">
            <NavigationButton 
                android.systemIcon="ic_menu_close_clear_cancel" @tap="onClose">
            </NavigationButton>
            <ActionItem @tap="onClose" android.systemIcon="ic_menu_save">
            </ActionItem>
        </ActionBar>
        <ScrollView>
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
                        <GridLayout columns="auto, *, 15" @tap="editPayeeEntityType">
                            <Label col="0" class="settings_form_title"
                                text="Type"></Label>
                            <Label col="1" class="settings_form_value"
                                :text="editableForm.PayeeEntityType"></Label>
                            <Label col="2" text.decode="&#xf0d7;" textAlignment="right" class="fas nt-icon" color="#999"></Label>
                        </GridLayout>
                        <GridLayout rows="auto, auto">
                            <Label row="0" class="settings_form_title"
                                text="Contact Email"></Label>
                            <TextField row="1" class="settings_form_value--ownline" 
                                v-model="editableForm.EmailAddress"></TextField>
                        </GridLayout>
                        <GridLayout rows="auto, auto">                                
                            <Label row="0" class="settings_form_title"
                                text="First Name"></Label>
                            <TextField row="1" class="settings_form_value--ownline" 
                                :text="editableForm.FirstName"></TextField>                                                    
                        </GridLayout>
                        <GridLayout rows="auto, auto">                                
                            <Label row="0" class="settings_form_title"
                                text="Middle Name"></Label>
                            <TextField row="1" class="settings_form_value--ownline" 
                                :text="editableForm.MiddleName"></TextField>                                                    
                        </GridLayout>
                        <GridLayout rows="auto, auto">                                
                            <Label row="0" class="settings_form_title"
                                text="Last Name"></Label>
                            <TextField row="1" class="settings_form_value--ownline" 
                                :text="editableForm.LastName"></TextField>                                                    
                        </GridLayout>
                        <GridLayout v-if="editableForm.PayeeEntityType === 'Company'" rows="auto, auto">                                
                            <Label row="0" class="settings_form_title"
                                text="Company"></Label>
                            <TextField row="1" class="settings_form_value--ownline" 
                                :text="editableForm.Company"></TextField>                                                    
                        </GridLayout>

                    </StackLayout>
                </GridLayout>
            </StackLayout>
        </ScrollView>        
    </Page>
    </Frame>
</template>
<script>
import * as Application from "application";
export default {
    props: {
        form: Object
    },
    data() {
        return {
            editableForm: {}
        }
    },
    methods: {
        onClose() {
            this.$modal.close();
        },
        async editPayeeEntityType() {
            var res = await this.$listPicker({ 
                list: ['Company', 'Individual'], 
                selected: this.editableForm.PayeeEntityType, 
                title: 'Select Type' 
            });
            this.editableForm.PayeeEntityType = res || this.editableForm.PayeeEntityType;
        },
    },
    mounted() {
        this.editableForm = JSON.parse(JSON.stringify(this.form));
    },
    created() {
        if (Application.android) {
            Application.android.on(Application.AndroidApplication.activityBackPressedEvent, this.onClose);
        }
    },
    destroyed() {
        if (Application.android) {
            Application.android.off(Application.AndroidApplication.activityBackPressedEvent, this.onClose);
        }        
    },
}
</script>