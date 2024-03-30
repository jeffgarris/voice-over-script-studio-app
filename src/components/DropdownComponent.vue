<template>
  <div class="dropdown adjectives">
    <button
      class="dropdown-toggle"
      @click="toggleShowDropdown()"
      @blur="onBlur"
    >
      {{ dropdown.selectedOption }}
    </button>
    <ul class="dropdown-menu" :class="{ show: showDropdownChildInstance }">
      <li
        v-for="(option, index) in dropdown.options"
        :key="index"
        @click="selectOption(dropdown, option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropdownComponent",
  props: {
    dropdown: Object,
  },
  data() {
    return {
      showDropdownChildInstance: this.showDropdown,
    };
  },
  methods: {
    selectOption(dropdown, option) {
      this.$emit("dropdown-events", {
        dropdown: this.dropdown,
        selectedOption: option,
      });
      this.showDropdownChildInstance = false;
    },
    onBlur() {
      this.toggleShowDropdown();
    },
    toggleShowDropdown() {
      this.showDropdownChildInstance = !this.showDropdownChildInstance;
    },
  },
};
</script>
