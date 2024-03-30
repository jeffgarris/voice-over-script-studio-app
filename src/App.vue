<template>
  <div id="page-wrap">
    <NavComponent />
    <MessageBar ref="messageBar" />
    <div id="main-section">
      <!-- Componentize -->
      <div class="gutter gutter-left"></div>

      <div id="content-column">
        <router-view></router-view>
      </div>

      <!-- Componentize -->
      <div class="gutter gutter-right"></div>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import NavComponentVue from "@/components/NavComponent.vue";
import MessageBarVue from "@/components/MessageBar.vue";
import FooterComponentVue from "@/components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavComponent: NavComponentVue,
    FooterComponent: FooterComponentVue,
    MessageBar: MessageBarVue,
  },
  data() {
    return {
      // items: [
      //   { text: "Word Counter", url: "/voice-over-script-word-counter" },
      //   { text: "Script Generator", url: "/voice-over-script-generator" },
      //   { text: "About", url: "/about" },
      // ],
    };
  },
  methods: {
    showMessageBar(message, status) {
      this.$refs.messageBar.showMessageBar(message, status);
    },
  },
};
</script>
