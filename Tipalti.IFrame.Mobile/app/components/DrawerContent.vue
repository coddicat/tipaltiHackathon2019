<template lang="html">
    <GridLayout rows="auto, *" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"></Image>
            <Label class="nt-drawer__header-brand" text="User Name"></Label>
            <Label class="nt-drawer__header-footnote" text="username@mail.com"></Label>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'InvoicesHistory' ? ' -selected': '')" @tap="onNavigationItemTap(InvoicesHistory)">
                    <Label col="0" text.decode="&#xf015;" class="nt-icon fas"></Label>
                    <Label col="1" text="Invoice History" class="p-r-10"></Label>
                </GridLayout>

                <StackLayout class="hr"></StackLayout>

                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>

                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>
                <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (currentPage === 'Settings' ? ' -selected': '')" @tap="onNavigationItemTap(Settings)">
                    <Label col="0" text.decode="&#xf013;" class="nt-icon fas"></Label>
                    <Label col="1" text="Settings" class="p-r-10"></Label>
                </GridLayout>

            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
import InvoicesHistory from "~/pages/InvoicesHistory";
import Settings from "~/pages/Settings";
import { GET_CURRENT_PAGE } from '~/consts/storeConst';
import { mapGetters } from 'vuex';
import { Frame } from "tns-core-modules/ui/frame";

export default {
    data () {
        return {
            InvoicesHistory: InvoicesHistory,
            Settings: Settings,
        };
    },
    computed: {
        ...mapGetters({
            currentPage: GET_CURRENT_PAGE
        })
    },
    components: {
        InvoicesHistory,
        Settings
    },
    methods: {
        onNavigationItemTap(component) {
            this.$navigateTo(component, {
                clearHistory: true,                    
            });
            this.$closeDrawer();
        }
    }
};
</script>
