<template>
  <li>
    {{ text }}: <span>{{ count }}</span>
  </li>
</template>

<script>

export default {
  props: {
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
