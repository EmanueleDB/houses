<template>
  <nav class="navigation">
    <div class="navigation__container">
      <img
        class="navigation__container__image"
        src="../static/images/img_logo_dtt@3x.png"
        alt="logo"
      />
      <ul v-for="item in navItems" :key="item.id">
        <router-link :class="['navigation__container__item']" :to="item.url">{{
          item.name
        }}</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  data() {
    return {
      navItems: [
        { id: 1, url: "/", name: "Houses" },
        { id: 2, url: "/about", name: "About" },
      ],
    };
  },
};
</script>

<style lang="scss">
.navigation {
  display: flex;
  height: 45px;
  margin-bottom: 90px;

  &__container {
    display: flex;
    align-items: center;

    &__image {
      height: 45px;
      margin-right: 20px;
    }

    &__item {
      color: $tertiary;
      @include font-montserrat-regular;
      font-size: 18px;
      text-decoration: unset;
      padding: 10px;
      margin-right: 20px;
      cursor: pointer;
    }
    .router-link-exact-active {
      @include font-montserrat-bold;
      color: $text-primary;
      cursor: default;
    }
  }
}
</style>
