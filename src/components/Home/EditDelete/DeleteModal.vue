<template>
  <div>
    <div v-if="showModal" class="overlay"></div>
    <div v-if="showModal" class="modal" id="modal">
      <div class="modal__header">Delete listing</div>
      <div class="modal__body">
        <p>
          Are you sure you want to delete this listing. <br />
          This action cannot de undone.
        </p>
      </div>
      <div class="modal__footer">
        <button class="modal__footer__delete" @click="$emit('delete')">
          YES, DELETE
        </button>
        <button class="modal__footer__back" @click="$emit('close')">
          GO, BACK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 102;
}

.modal {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  width: 90%;
  height: 300px;
  background-color: $white;
  border-radius: 10px;
  margin: auto;
  z-index: 103;
  text-align: center;
  padding: 10px;
  bottom: 0;

  @include respond-to("md") {
    height: 300px;
    width: 500px;
    top: unset;
  }
  &__header {
    font-size: 1.5rem;
    @include font-montserrat-semiBold;
    margin: 1rem 2rem;
  }
  &__body {
    margin: 2rem 4rem;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    margin: 1rem 4rem;
    align-items: center;

    &__delete {
      @include font-montserrat-bold;
      width: 250px;
      padding: 10px;
      border-radius: 5px;
      border: unset;
      text-transform: uppercase;
      background-color: $primary;
      color: $white;
      cursor: pointer;
      font-size: 12px;
      margin-bottom: 1rem;
      @include respond-to("md") {
        font-size: 18px;
        width: 400px;
      }
    }
    &__back {
      @include font-montserrat-bold;
      width: 250px;
      padding: 10px;
      border-radius: 5px;
      border: unset;
      text-transform: uppercase;
      background-color: $text-secondary;
      color: $white;
      cursor: pointer;
      font-size: 12px;
      @include respond-to("md") {
        font-size: 18px;
        width: 400px;
      }
    }
  }
}
</style>