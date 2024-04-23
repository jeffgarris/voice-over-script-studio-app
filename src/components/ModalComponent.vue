<template>
  <div class="modal" v-if="show" @click.self="handleCancel">
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
export default {
  name: "ModalComponent",
  props: ["show", "title", "message"],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      this.$emit("closeModal");
    },
  },
};
</script>
