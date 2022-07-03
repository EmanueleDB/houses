<template>
  <div>
    <div class="container">
      <div class="container__row">
        <h1>Houses</h1>
        <div class="container__row__button-container">
          <button
            v-if="windowWidth > 455"
            class="container__row__button-container__button"
          >
            <img
              class="container__row__button-container__button__icon"
              src="../static/images/ic_plus_white@3x.png"
              alt="plus-icon"
            />
            create new
          </button>
        </div>
      </div>
      <div class="container__row">
        <img
          class="container__row__search-icon"
          src="../static/images/ic_search@3x.png"
          alt="search icon"
        />
        <input
          type="text"
          placeholder="Search for a house"
          class="container__row__input-text"
        />
        <div class="tab container__row__tab">
          <button
            :class="[
              'container__row__tab__price',
              { active: clicked === 'price' },
            ]"
            @click="clicked = 'price'"
          >
            Price
          </button>
          <button
            :class="[
              'container__row__tab__size',
              { active: clicked === 'size' },
            ]"
            @click="clicked = 'size'"
          >
            Size
          </button>
        </div>
      </div>
      <div class="container__house-list">
        <div
          v-for="house in houses"
          class="container__house-list__house"
          :key="house.id"
        >
          <img
            :src="house.image"
            alt="house-image"
            class="container__house-list__house__image"
          />
          <div class="container__house-list__house__details">
            <p class="container__house-list__house__details__street">
              {{ house.location.street }}
            </p>
            <p class="container__house-list__house__details__price">
              &euro; {{ house.price }}
            </p>
            <p class="container__house-list__house__details__zip">
              {{ house.location.zip }} {{ house.location.city }}
            </p>
            <div class="container__house-list__house__details__rooms">
              <img
                class="container__house-list__house__details__rooms__image"
                src="../static/images/ic_bed@3x.png"
                alt="bed"
              />
              <p class="container__house-list__house__details__rooms__specs">
                {{ house.rooms.bedrooms }}
              </p>
              <img
                class="container__house-list__house__details__rooms__image"
                src="../static/images/ic_bath@3x.png"
                alt="baths"
              />
              <p class="container__house-list__house__details__rooms__specs">
                {{ house.rooms.bathrooms }}
              </p>
              <img
                class="container__house-list__house__details__rooms__image"
                src="../static/images/ic_size@3x.png"
                alt="size"
              />
              <p class="container__house-list__house__details__rooms__specs">
                {{ house.size }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Houses",
  props: {
    msg: String,
  },
  data() {
    return {
      clicked: "price",
      houses: [],
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize)
    this.getHouses()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    async getHouses() {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const response = await axios.get(
          "https://api.intern.d-tt.nl/api/houses",
          { headers }
        )
        this.houses = response.data
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    },
    checkScreenSize(e) {
      this.windowWidth = e.currentTarget.innerWidth;
      console.log(this.windowWidth)
    },
  },
}
</script>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  &__row {
    position: relative;
    display: flex;
    justify-content: space-between;
    grid-column: span 12;
    margin-bottom: 2rem;

    h1 {
      
    }

    &__button-container {
      margin: auto 0;
      &__button {
        @include font-montserrat-semiBold;
        width: 150px;
        padding: 10px;
        border-radius: 5px;
        border: unset;
        text-transform: uppercase;
        background-color: $primary;
        color: $white;
        cursor: pointer;
        &__icon {
          width: 11px;
          margin-right: 5px;
        }
      }
    }

    &__search-icon {
      position: absolute;
      width: 15px;
      height: 15px;
      top: 50%;
      left: 20px;
      transform: translate(-50%, -50%);
      color: $tertiary;
    }

    &__input-text {
      width: 40%;
      border: unset;
      border-radius: 5px;
      padding: 10px 0 10px 40px;
      background-color: $tertiary-light;
      &::placeholder {
        color: $tertiary;
      }
    }

    &__tab {
      &__price,
      &__size {
        background-color: $tertiary;
        width: 110px;
        color: $white;
        padding: 10px 0;
        border: unset;
        cursor: pointer;

        &.active {
          background-color: $primary;
        }
      }
      &__price {
        border-radius: 5px 0 0 5px;
      }
      &__size {
        border-radius: 0 5px 5px 0;
      }
    }
  }

  &__house-list {
    display: flex;
    flex-direction: column;
    grid-column: span 12;
    justify-content: space-between;
    width: 60%;

    &__house {
      display: flex;
      flex-direction: row;
      margin-bottom: 3rem;

      &__image {
        width: 150px;
        border-radius: 5px;
        margin-right: 2rem;

        @include respond-to("xs") {
          margin-right: 1rem;
        }
      }
      &__details {
        padding: 10px;

        &__street {
          @include font-montserrat-bold;
          font-size: 16px;
          margin-bottom: 5px;
        }
        &__price,
        &__zip {
          @include font-montserrat-regular;
          font-size: 14px;
          margin-bottom: 5px;
        }
        &__zip {
          color: $tertiary;
        }
        &__rooms {
          display: flex;
          align-items: center;

          &__image {
            width: 15px;
            height: 15px;
            margin-right: 10px;
          }

          &__specs {
            @include font-montserrat-regular;
            font-size: 14px;
            color: $tertiary;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>