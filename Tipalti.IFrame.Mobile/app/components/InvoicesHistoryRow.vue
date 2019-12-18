<template>
    <GridLayout rows="*" columns="*,*,*,30" style="border-bottom-color: black; border-bottom-width: 0.5; height: 50;" >
        <Label row="0" col="0" textAlignment="left" :text="invoice.InvoiceNumber"></Label>
        <Label row="0" col="1" textAlignment="center" :text="invoice.Amount | amount"></Label>
        <Label row="0" col="2" textAlignment="center" :text="invoice.StatusDescription"></Label>
        <Label row="0" col="3" textAlignment="right" text.decode="&#xf35d;" class="fas" @tap="onTap()"></Label>
    </GridLayout>    
</template>
<script>
import ModalInvoiceInfo from '~/components/ModalInvoiceInfo'
export default {
    props: {
        invoice: Object
    },
    methods: {
        onTap() {
            this.$navigateTo(ModalInvoiceInfo, { 
                frame: 'root-frame', 
                props: { 
                    invoice: this.invoice 
                } 
            });
        }
    },
    components: {
        ModalInvoiceInfo
    }
}
</script>