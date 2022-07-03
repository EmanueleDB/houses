<template>
  <div class="houses">
    <div class="container">
      <div class="container__row">
        <h1>Houses</h1>
        <div class="container__row__button-container">
          <button class="container__row__button-container__button">
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
      <div class="container__list">
        <h1>sds</h1>
        <button>dsfdsfdsf</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    };
  },
  mounted() {
    this.getHouses();
  },
  methods: {
    async getHouses() {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY };
        const response = await axios.get(
          "https://api.intern.d-tt.nl/api/houses",
          { headers }
        );
        this.houses = response.data;
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
.houses {
  .container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    &__row,
    &__list {
      //@include respond-to("md") {
      //  background-color: orange;
      //}
      position: relative;
      display: flex;
      justify-content: space-between;
      grid-column: span 12;
      margin-bottom: 2rem;

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
  }
}
</style>
