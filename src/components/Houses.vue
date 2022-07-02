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
        <button>dsfdsfdsf</button>
      </div>
      <div class="container__list">
        <h1>sds</h1>
        <button>dsfdsfdsf</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Houses",
  props: {
    msg: String,
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
        width: 50%;
        border: unset;
        border-radius: 5px;
        padding: 10px 0 10px 40px;
        background-color: $tertiary-light;
        &::placeholder {
          color: $tertiary;
        }
      }
    }
  }
}
</style>
