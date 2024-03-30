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
    defaultChecked: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      checked: this.defaultChecked,
    };
  },
  watch: {
    value(newVal) {
      this.checked = newVal;
    },
  },
  methods: {
    onChange() {
      Cookies.set(this.id, this.checked);
      // this.$emit("change", { id: this.id, checked: this.checked });
    },
  },
  mounted() {
    const cookieValue = Cookies.get(this.id);
    if (cookieValue !== undefined) {
      this.checked = cookieValue === "true";
    }
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
