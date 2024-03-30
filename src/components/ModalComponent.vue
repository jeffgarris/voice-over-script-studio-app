<template>
  <div class="modal" v-if="show" v-click-outside="handleCancel">
    <!-- <div class="modal-overlay" @click="close"></div> -->
    <div class="modal-container">
      <div class="modal-content">
        <h4 class="modal-header">{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button @click="confirm" class="primary">Confirm</button>
        <button @click="handleCancel" class="secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

export default {
  name: "MOdalComponent",
  props: ["show", "title", "message"],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      console.log("clicked outside");
      this.$emit("closeModal");
    },
  },
};
</script>
