<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Invoice info">
            <NavigationButton 
                android.systemIcon="ic_menu_close_clear_cancel" @tap="onClose">
            </NavigationButton>
        </ActionBar>
        <ScrollView>
            <StackLayout class="invoice_info_content">
                <DockLayout class="invoice_info_value_group">
                    <Label dock="left" text="Invoice Number" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.InvoiceNumber"></Label>
                </DockLayout>

                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Payer Entity" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.PayerEntityName"></Label>
                </DockLayout>

                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Amount" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.Amount | amount"></Label>
                </DockLayout>

                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Status" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.StatusDescription"></Label>
                </DockLayout>

                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Invoice Date" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.InvoiceDate | formatDate"></Label>
                </DockLayout>

                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Invoice Due Date" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.InvoiceDueDate | formatDate"></Label>
                </DockLayout>
                
                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Outstanding Amount" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.OutstandingAmount | amount"></Label>
                </DockLayout>
                
                <DockLayout class="invoice_info_value_group">    
                    <Label dock="left" text="Payment Scheduled Date" class="invoice_info_value_title"></Label>
                    <Label dock="right" textAlignment="right" :text="invoice.PaymentScheduledDate | formatDate"></Label>
                </DockLayout>
            </StackLayout>
        </ScrollView>        
    </Page>
</template>
<script>
export default {
    props: {
        invoice: Object
    },
    methods: {
        onClose() {
            this.$navigateBack();
        },
    },
}
</script>