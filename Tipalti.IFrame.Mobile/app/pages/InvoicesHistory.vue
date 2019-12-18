<template>
    <Page class="page" @loaded="onPageLoaded">
        <ActionBar class="action-bar" title="Invoices History">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
        </ActionBar>
        <GridLayout style="font-size: 14" class="page__content" columns="*" rows="30, *">
            <GridLayout row="0" col="0">
                <GridLayout rows="*" columns="*,*,*,30" style="background-color:#cfc; border-bottom-color: black; border-bottom-width: 0.5; font-weight: 500">
                    <Label verticalAlignment="center" textAlignment="center" row="0" col="0" text="Invoice Number"></Label>
                    <Label verticalAlignment="center" textAlignment="center" row="0" col="1" text="Amount"></Label>
                    <Label verticalAlignment="center" textAlignment="center" row="0" col="2" text="Status"></Label>
                </GridLayout>
            </GridLayout>
            <RadListView 
                :loadOnDemandMode="loadOnDemandMode" 
                @loadMoreDataRequested="onLoadMoreDataRequested" 
                pullToRefresh="true" 
                @pullToRefreshInitiated="onPullToRefreshInitiated"
                row="1" col="0" for="item in itemList">
                <v-template>
                    <InvoicesHistoryRow :invoice="item"></InvoicesHistoryRow>
                </v-template>
            </RadListView> 

            <ActivityIndicator row="0" col="0" rowSpan="2"
                :busy="loading && (!itemList || itemList.length === 0)"
                class="activity-indicator">
            </ActivityIndicator>           
        </GridLayout>
    </Page>
</template>

<script>
import {
    GET_LOADING, 
    LOAD_INVOICE_HISTORY,
    GET_INVOICE_HISTORY
} from '~/consts/storeConst'; 
import { mapGetters, mapActions } from 'vuex';
import InvoicesHistoryRow from '@/components/InvoicesHistoryRow';    

export default {
    page: 'InvoicesHistory',
    data() {
        return {
            PageCount: 1,
            loadOnDemandMode: 'None'
        }
    },
    computed: {
        ...mapGetters({            
            loading: GET_LOADING,  
            invoicesHistory: GET_INVOICE_HISTORY
        }),
        itemList(){
            if(this.invoicesHistory && this.invoicesHistory.Data) {
                return this.invoicesHistory.Data;
            } 
            return [];
        }
    },
    methods: {
        ...mapActions({
            loadInvoicesHistory: LOAD_INVOICE_HISTORY,
        }),
        async onLoadMoreDataRequested(args) {                
            const listView = args.object;
            if(this.itemList.length > 0) {
                args.returnValue = true;
                this.PageCount++;                  
                await this.onLoad();
                listView.notifyLoadOnDemandFinished();
            } else {
                args.returnValue = false;
                listView.notifyLoadOnDemandFinished(true);                    
            }                                
        },
        async onPullToRefreshInitiated(args) {
            this.PageCount = 1;
            await this.onLoad();
            const listView = args.object;
            listView.notifyPullToRefreshFinished();                
        },
        async onLoad() {                
            await this.loadInvoicesHistory(this.PageCount);
        },
        onDrawerButtonTap() {
            this.$showDrawer();
        },
        async onPageLoaded() {                
            await this.onLoad();
            this.$nextTick(() => {
                this.loadOnDemandMode = "Manual";
            });
        },        
    },
    components: {
        InvoicesHistoryRow
    },
};
</script>
