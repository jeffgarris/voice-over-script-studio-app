<template>
  <div class="error-page">
    <br />
    <br />
    <br />
    <br />
    <h1>Well, I wasn't counting on this!</h1>
    <h3>
      You can head to the
      <router-link to="/" class="accent-link">Home Page</router-link>, if you
      like, while I run the numbers on this one.
    </h3>
  </div>
  <br />
  <br />
  <img src="@/assets/images/404.png" />
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
