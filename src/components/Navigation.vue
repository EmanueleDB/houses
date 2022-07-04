<template>
  <nav class="navigation">
    <div v-if="windowWidth > 455" class="navigation__container">
      <img
        class="navigation__container__image"
        src="../static/images/img_logo_dtt@3x.png"
        alt="logo"
        @click="$router.push('/').catch(()=>{});"
      />
      <ul v-for="item in navItems" :key="item.id">
        <router-link class="navigation__container__item" :to="item.url">{{
          item.name
        }}</router-link>
      </ul>
    </div>
    <div v-else class="navigation__container">
      <div
        style="width: 50%; text-align: center"
        v-for="item in navItems"
        :key="item.id"
      >
        <router-link class="navigation__container__item" :to="item.url">
          <div
            class="navigation__container__item__wrapper"
            @click="activeBtn = '#' + item.url"
          >
            <img
              class="navigation__container__item__wrapper__image"
              :src="
                activeBtn === '#' + item.url
                  ? require(`../static/images/${item.icon.active}`)
                  : require(`../static/images/${item.icon.default}`)
              "
              alt="logo"
            />
          </div>
        </router-link>
      </div>
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
        {
          id: 1,
          url: "/",
          name: "Listings",
          icon: {
            default: "ic_mobile_navigarion_home@3x.png",
            active: "ic_mobile_navigarion_home_active@3x.png",
          },
        },
        {
          id: 2,
          url: "/about",
          name: "About",
          icon: {
            default: "ic_mobile_navigarion_info@3x.png",
            active: "ic_mobile_navigarion_info_active@3x.png",
          },
        },
      ],
      activeBtn: "",
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
    this.activeBtn = window.location.hash
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
.navigation {
  display: flex;

  &__container {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 55px;
    background-color: $background;

    @include respond-to("md") {
      position: relative;
      justify-content: unset;
    }

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

      &__wrapper {
        &__image {
          width: 30px;
          height: 30px;
        }
      }
    }
    .router-link-exact-active {
      @include font-montserrat-bold;
      color: $text-primary;
      cursor: default;
    }
  }
}
</style>
