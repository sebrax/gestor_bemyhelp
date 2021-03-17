<template>
  <div class="orders-list">
    <div class="media px-2">
      <h2 class="title py-4">Pedidos</h2>
    </div>
    <div class="orders">
      <article
        v-for="(order, index) in orders"
        class="media py-3 px-3 my-0"
        :class="{ active: selected == order.id, pending: !order.status }"
        :key="index"
        @click="$emit('set-order', order)"
      >
        <div class="media-content">
          <div class="content mb-1">
            <small
              ><strong>{{ '#' + order.id }} |</strong>
              {{ formatDate(order.created_at, true) }}</small
            >
            <p>{{ order.user_name + ' ' + order.user_lastname }}</p>
          </div>

          <span v-if="order.status == 1" class="tag mr-2 is-black">{{
            'Em preparo'
          }}</span>
          <span v-else-if="order.status == 2" class="tag mr-2 is-info">{{
            'Aguardando retirada'
          }}</span>
          <span
            v-else-if="order.status == 3"
            class="tag mr-2"
            :class="{
              'is-success':
                order.delivery_option == 2 || order.delivery_option == 3,
              'is-warning': order.delivery_option == 1,
            }"
            >{{
              order.delivery_option == 1 ? 'Saiu para entrega' : 'Concluído'
            }}</span
          >
          <span v-else-if="order.status == 4" class="tag mr-2 is-success">{{
            'Concluído'
          }}</span>
          <span v-else-if="order.status == 5" class="tag mr-2 is-danger">{{
            'Cancelado'
          }}</span>
          <span v-else class="tag mr-2 is-white">{{ 'Pendente' }}</span>
        </div>
      </article>
    </div>

    <!-- <div class="media px-2 is-flex-direction-column status-guide">
      <h3 class="is-size-6 mb-2">Legenda:</h3>
      <div class="tags">
        <span class="tag is-white">Pendente</span>
        <span class="tag is-info">Em preparo</span>
        <span class="tag is-warning">Saiu para entrega</span>
        <span class="tag is-success">Concluído</span>
        <span class="tag is-danger">Cancelado</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { formatDate } from '@/mixins';

export default {
  mixins: [formatDate],
  name: 'OrdersList',
  props: {
    orders: Array,
    selected: String,
  },
};
</script>
