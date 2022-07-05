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

<script>
import ImageHelper from "./IconHelper"

export default {
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
}
</script>
