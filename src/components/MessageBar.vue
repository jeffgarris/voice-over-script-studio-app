<template>
  <div v-if="isVisible" class="message-bar" :class="[status]">
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
      isVisible: false,
      message: "",
      status: null,
      clickToClose: false,
    };
  },
  methods: {
    showMessageBar(message, status, duration = 3000) {
      this.message = message;
      this.status = status;
      this.isVisible = true;

      if (this.status === "success") {
        setTimeout(() => {
          this.hideMessageBar();
        }, duration);
      } else {
        this.clickToClose = true;
      }
    },
    hideMessageBar() {
      this.isVisible = false;
    },
  },
};
</script>
