<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <Label v-if="title" fontSize="18" style="font-weight: 500; padding: 10" 
                :text="title"></Label>
            <Label textWrap="true" style="text-align: center" fontSize="16" 
                :text="text"></Label>
            <Button @tap="onClose" text="Ok"></Button> 
        </StackLayout>        
    </Page>    
</template>
<script>
export default {
    props: {
        text: String,
        title: String
    },
    methods: {
        onClose() {
            this.$modal.close();
        }
    }    
}
</script>