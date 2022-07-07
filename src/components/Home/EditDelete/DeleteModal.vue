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
        <button @click="$emit('delete')">YES, DELETE</button>
        <button @click="$emit('close')">Go, BACK</button>
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
  background-color: rgba(0, 0, 0, .7);  z-index: 102;
}

.modal {
  height: 250px;
  width: 500px;
  position: absolute;
  background-color: $white;
  border-radius: 10px;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 2rem;
  right: 0;
  margin: auto;
  z-index: 103;
  text-align: center;

  &__header, &__body {
    margin-bottom: 2rem;
  }

  &__header {
    font-size: 1.5rem;
    @include font-montserrat-semiBold;
  }

  &__footer {
    display: flex;
    flex-direction: column;
  }
}
</style>
