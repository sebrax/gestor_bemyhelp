<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- <div class="navbar-item">
        <img src="https://bulma.io/images/placeholders/128x128.png" />
      </div> -->
      <div class="navbar-item">
        <p class="is-size-6 has-text-weight-bold">{{ name }}</p>
      </div>
    </div>
    <div class="navbar-end">
      <!-- <div class="navbar-item">
        <input
          type="checkbox"
          id="store_status"
          class="switch is-rounded"
          :checked="status == 1"
        />
        <label for="store_status">{{
          status == 1 ? 'Loja Aberta' : 'Loja Fechada'
        }}</label>
      </div> -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    name: String,
    status: String,
  },
};
</script>
