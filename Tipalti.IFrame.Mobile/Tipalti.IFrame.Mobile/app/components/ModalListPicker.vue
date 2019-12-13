<template>
    <Page actionBarHidden="true" style="padding: 10">
        <StackLayout width="100%">
            <Label v-if="title" fontSize="18" style="font-weight: 500; padding: 10" 
                :text="title"></Label>
            <ListView for="item in list" @itemTap="onItemTap" width="100%">
                <v-template>
                    <StackLayout orientation="horizontal" width="100%">
                        <Label v-if="selected == item" text.decode="&#xf192;" class="nt-icon far"></Label>
                        <Label v-else text.decode="&#xf111;" class="nt-icon far"></Label>                    
                        <Label :text="item" fontSize="16" />
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
        selected: String,
        title: String
    },
    methods: {
        onItemTap({ item }) {                  
            //this.selected = item;
            this.$modal.close(item);
        }
    },
}
</script>