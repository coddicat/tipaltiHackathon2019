<template>
    <Page ref="modalListPickerPage" actionBarHidden="true" style="padding: 10" @loaded="onPageLoaded">        
        <StackLayout width="100%">
            <Label fontSize="18" style="font-weight: 500; padding: 10" 
                :text="title"></Label>
            <ListView id="scrollView" for="item in list" @itemTap="onItemTap" width="100%" rowHeight="50" :height="list.length * 50">
                <v-template>
                    <StackLayout orientation="horizontal" width="100%" height="50">
                        <Label v-if="selected == item" text.decode="&#xf192;" class="nt-icon-middle far"></Label>
                        <Label v-else text.decode="&#xf111;" class="nt-icon-middle far"></Label>                    
                        <Label :text="getDisplayFunc(item)" fontSize="16" />
                    </StackLayout>                
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>
<script>
export default {
    props: {
        list: Array,
        selected: [String, Object, Number, Boolean],
        title: String,
        getDisplayFunc: {
            type: Function,
            default: (x) => x
        }
    },
    methods: {
        onItemTap({ item }) {                  
            this.$modal.close(item);
        },
        onPageLoaded(args) {
            const index = this.list.indexOf(this.selected);
            this.$refs.modalListPickerPage.nativeView.getViewById('scrollView').scrollToIndex(index);
        }
    },
}
</script>