<template lang="html">
  <RadSideDrawer id="sideDrawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <DrawerContent></DrawerContent>
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <!-- <InvoicesHistory></InvoicesHistory> -->
      <Settings></Settings>
    </Frame>
  </RadSideDrawer>
</template>

<script>
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import * as statusBar from 'nativescript-status-bar';
import { GET_ORIENTATION } from '~/consts/storeConst'; 
import { mapGetters } from 'vuex';
import Settings from "~/pages/Settings";
import InvoicesHistory from "~/pages/InvoicesHistory";
import DrawerContent from "~/components/DrawerContent";

export default {
  data () {
    return {
      transition: new SlideInOnTopTransition()
    }
  },
  computed: {
    ...mapGetters({
        orientation: GET_ORIENTATION
    }),        
  },   
  components: {
    InvoicesHistory, DrawerContent,
    Settings
  },  
  mounted() {
    this.$initOrientation();
  },
  watch: {
    orientation(val) {
      if(val === 'landscape') {
        statusBar.hide();
      } else {
        statusBar.show();
      }
    }
  },
}
</script>