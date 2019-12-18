<template lang="html">
  <Frame id="root-frame">
    <Page actionBarHidden="true">
      <RadSideDrawer ref="sideDrawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
        <StackLayout ~drawerContent backgroundColor="#ffffff">
          <slot name="drawerContent"></slot>
        </StackLayout>
        <Frame ~mainContent id="drawerMainContent">
          <slot name="mainContent"></slot>
        </Frame>
      </RadSideDrawer>
    </Page>
  </Frame>
</template>

<script>
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import Settings from "~/pages/Settings";
import InvoicesHistory from "~/pages/InvoicesHistory";
import DrawerContent from "~/components/DrawerContent";

export default {
  data () {
    return {
      transition: new SlideInOnTopTransition()
    }
  },
  components: {
    InvoicesHistory, 
    DrawerContent,
    Settings
  }, 
  mounted() {
      this.$initDrawer(this.$refs.sideDrawer);
  },
}
</script>