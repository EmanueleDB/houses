<template>
  <div style="display: flex">
    <img
      class="container__infos__icon"
      :src="require(`../../../static/images/${url}`)"
      :alt="alt"
    />
    <p>{{ subProperty ? value[property][subProperty] : value[property] }}</p>
  </div>
</template>

<script>
export default {
  name: "IconHelper",
  props: {
    property: {
      type: [String, Number],
      required: true,
    },
    subProperty: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  computed: {
    value() {
      return this.$store.state.selectedListing
    },
  },
}
</script>
