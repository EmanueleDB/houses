<template>
  <div :class="['edit', { edit__top: changePosition }]">
    <img
      class="edit__icon"
      :src="
        changePosition && windowWidth < 768
          ? require(`../../../static/images/ic_edit_white@3x.png`)
          : require(`../../../static/images/ic_edit@3x.png`)
      "
      alt="edit"
    />
    <img
      class="edit__icon"
      :src="
        changePosition && windowWidth < 768
          ? require(`../../../static/images/ic_delete_white@3x.png`)
          : require(`../../../static/images/ic_delete@3x.png`)
      "
      alt="edit"
    />
  </div>
</template>
<script>
export default {
  name: "EditDelete",
  props: {
    changePosition: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    checkScreenSize(e) {
      this.windowWidth = e.currentTarget.innerWidth
    },
  },
}
</script>

<style lang="scss">
.edit {
  display: flex;

  &__icon {
    width: 15px;
    height: 15px;
    margin-left: 10px;
  }

  &__top {
    position: absolute;
    top: 80px;
    right: 20px;

    @include respond-to("md") {
      position: unset;
    }
  }
}
</style>
