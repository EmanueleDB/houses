<template>
  <div style="display: flex">
    <ImageHelper
      v-for="image of value"
      :key="image.alt"
      :property="image.property"
      :sub-property="image.subProperty"
      :alt="image.alt"
      :url="image.url"
    />
  </div>
</template>

<script lang="ts">
import ImageHelper from "./IconHelper.vue"
import Vue from "vue"

export default Vue.extend({
  name: "Section",
  components: {
    ImageHelper,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
})
</script>
