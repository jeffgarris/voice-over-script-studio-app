<template>
  <li>
    {{ text }}: <span>{{ count }}</span>
  </li>
</template>

<script>

export default {
  props: {
    // id: {
    //   type: String,
    //   required: true,
    // },
    text: {
      type: String,
    },
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>
