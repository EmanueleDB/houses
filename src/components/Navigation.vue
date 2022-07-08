<template>
  <div class="navigation-container">
    <nav v-if="windowWidth > 576" class="navigation-container__navigation">
      <div class="navigation-container__navigation__container">
        <img
          class="navigation-container__navigation__container__image"
          src="../static/images/img_logo_dtt@3x.png"
          alt="logo"
          @click="
            $router.push('/').catch(() => {})
            setActiveBtn('/')
          "
        />
        <ul v-for="item in navItems" :key="item.id">
          <span @click="setActiveBtn(item.url)">
            <router-link
              :class="[
                'navigation-container__navigation__container__item',
                { 'router-link-exact-active': activeBtn === item.url },
              ]"
              :to="item.url"
              >{{ item.name }}</router-link
            ></span
          >
        </ul>
      </div>
    </nav>
    <nav v-else class="navigation-container__navigation">
      <div class="navigation-container__navigation__container">
        <div
          style="width: 50%; text-align: center"
          v-for="item in navItems"
          :key="item.id"
        >
          <router-link
            class="navigation-container__navigation__container__item"
            :to="item.url"
          >
            <div
              class="navigation-container__navigation__container__item__wrapper"
              @click="setActiveBtn(item.url)"
            >
              <img
                class="navigation-container__navigation__container__item__wrapper__image"
                :src="
                  activeBtn === item.url
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
  </div>
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
          name: "Houses",
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
    }
  },
  watch: {
    activeBtn(to) {
      this.setActiveBtn(to)
    },
  },
  computed: {
    activeBtn() {
      return this.$store.state.navigationActiveItem
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },
  },
  methods: {
    setActiveBtn(url) {
      this.$store.commit("setNavigationActiveItem", url)
    },
  },
}
</script>

<style lang="scss">
.navigation-container {
  position: fixed;
  right: 0;
  z-index: 100;
  bottom: 0;
  height: 55px;
  background-color: $white;

  width: 100%;
  @include respond-to("md") {
    top: 0;
    bottom: unset;
    height: unset;
    padding: 10px;
  }

  &__navigation {
    display: flex;
    height: 55px;
    @include respond-to("md") {
      margin: 0 10%;
      height: 70px;
    }

      &__container {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: $white;

      @include respond-to("md") {
        padding: 10px;
      }

      &__image {
        height: 45px;
        margin-right: 20px;
      }

      &__item {
        @include respond-to("md") {
          text-decoration: unset;
          cursor: pointer;
          color: $tertiary;
          @include font-montserrat-regular;
          font-size: 18px;
        }
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
}
</style>
