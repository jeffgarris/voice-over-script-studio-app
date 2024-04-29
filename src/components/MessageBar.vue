<template>
  <div v-if="showBar" class="message-bar" :class="[status]">
    <span class="message">{{ message }}</span>
    <button v-show="clickToClose" @click="hideMessageBar()" class="close">
      x
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBar: false,
      message: "",
      status: null,
      clickToClose: false,
    };
  },
  methods: {
    showMessageBar(message, status, duration = 3000) {
      this.message = message;
      this.status = status;
      this.showBar = true;

      if (status === "success") {
        setTimeout(() => {
          this.hideMessageBar();
        }, duration);
      } else {
        this.clickToClose = true;
      }
    },
    hideMessageBar() {
      this.showBar = false;
    },
  },
};
</script>
