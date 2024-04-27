<template>
  <div class="toggle-checkbox">
    <span>{{ label }}</span>
    <input type="checkbox" :id="id" v-model="checked" @change="onChange" />
    <label class="toggle-label" :for="id"></label>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    default: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checked: this.default,
    };
  },
  methods: {
    onChange() {
      Cookies.set(this.id, this.checked);
      this.$emit('toggleStateChanged', { id: this.id, checked: this.checked });
    },
  },
  mounted() {
    // Check for a cookie for each toggle on the page
    const cookieValue = Cookies.get(this.id);
    // If a cookie if found, update data with cookie value
    if (cookieValue !== undefined) {
      this.checked = cookieValue === 'true';
    }
    this.onChange(); // Not sure if this is a good practice
  },
};
</script>

<style scoped>
.toggle-checkbox {
  display: flex;
  align-items: center;
}

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
