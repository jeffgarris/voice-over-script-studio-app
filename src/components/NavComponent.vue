<template>
  <div class="nav">
    <div class="nav-content">
      <div class="site-title">Voice Over Script Studio</div>
      <!-- <div class="nav-dropdown-container" ref="dropdownContainer">
        <button @click="toggleDropdown" class="dropdown-toggle open">
          Voice Over Script Tools
        </button>
        <ul v-if="isDropdownOpen" class="nav-dropdown">
          <li v-for="item in items" :key="item.name" @click="makeSelection">
            <router-link class="router-link" :to="item.url">{{
              item.name
            }}</router-link>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      items: [
        { name: "Word Counter", url: "/" },
        { name: "Script Formatter", url: "/voice-over-script-formatter" },
        { name: "Script Generator", url: "/voice-over-script-generator" },
        // { name: "About", url: "/about" },
      ],
      isDropdownOpen: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  // beforeUnmount() {
  //   document.removeEventListener("click", this.handleClickOutside);
  // },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    makeSelection() {
      this.isDropdownOpen = false;
    },
    // handleClickOutside(event) {
    //   // Check if the click is outside the dropdown container
    //   if (
    //     !this.$refs.dropdownContainer.contains(event.target) &&
    //     this.isDropdownOpen
    //   ) {
    //     this.isDropdownOpen = false;
    //   }
    // },
  },
};
</script>
