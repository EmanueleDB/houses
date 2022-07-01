<template>
  <div class="home">
    <Houses msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Houses from "@/components/Houses.vue"; // @ is an alias to /src

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    Houses,
  },
};
</script>
