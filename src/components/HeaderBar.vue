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
      <div class="navbar-item">
        <div class="buttons are-medium">
          <button
            disabled
            class="button is-small"
            :class="{ 'is-success': status == 1 }"
            style="opacity: 1"
          >
            <span>{{ status == 1 ? 'Loja aberta' : 'Loja fechada' }}</span>
          </button>
          <button
            @click="$emit('update-store-status', status)"
            class="button is-small is-text"
          >
            {{ status == 1 ? 'Fechar Loja' : 'Abrir Loja' }}
          </button>
        </div>
      </div>
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
