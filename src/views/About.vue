<template>
  <div class="container">
    <div class="container__about">
      <h1 style="text-align: center">About</h1>
      <h2>About DTT Real Estate</h2>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
      <hr />
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua."
      </p>
    </div>
    <div class="container__about">
      <h2>Designed and development</h2>
      <div class="container__about__wrapper">
        <img
          class="container__about__wrapper__image"
          src="../static/images/img_logo_dtt@3x.png"
          alt="logo"
        />
        <div class="container__about__wrapper__website">
          <p>By DTT</p>
          <a
            class="container__about__wrapper__website__link"
            href="https://www.d-tt.nl/en/"
            >www.d-tt.nl</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  &__about {
    display: flex;
    grid-column: span 12;
    justify-content: center;
    flex-direction: column;
    margin: 1rem 5%;

    @include respond-to("md") {
      margin: 2rem 0 1rem 0;
    }

    p {
      @include font-montserrat-regular;
      line-height: 1.6;
    }

    h1 {
      font-size: 22px;
      margin-bottom: 1rem;
      @include respond-to("md") {
        display: none;
      }
    }
    h2 {
      font-size: 14px;
      @include respond-to("md") {
        font-size: 2rem;
      }
    }

    &__wrapper {
      display: flex;

      &__image {
        width: 30%;
      }
      &__website {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 5%;
        font-size: 14px;

        @include respond-to("md") {
          font-size: 1rem;
        }

        &__link {
          color: $text-link;
          text-decoration: unset;
        }
      }
    }
  }
}
</style>
