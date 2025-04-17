<template>
  <div class="footer">
    <div class="footer-content">
      <div class="site-credit">
        <p class="headroom-none">
          Created by
          <a href="https://jeffgarrisvoiceover.com">Jeff Garris Voice Over</a>
        </p>
        <p class="copyright headroom-mini">
          © {{ currentYear }} Jeff Garris Voice Over
        </p>
      </div>
      <ul>
        <!-- <li>
          <router-link class="router-link" to="/">Placeholder</router-link>
        </li> -->
        <!-- <li v-for="item in items" :key="item">
          <a v-bind:href="item.url">{{ item.text }}</a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      items: [
        { text: "Word Counter", url: "/voice-over-script-word-counter" },
        { text: "Script Generator", url: "/voice-over-script-generator" },
        { text: "About", url: "/about" },
      ],
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
