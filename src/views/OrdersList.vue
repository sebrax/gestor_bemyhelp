<template>
  <div class="orders-list">
    <div class="media px-2">
      <h2 class="title py-4">Pedidos</h2>
    </div>
    <div class="orders">
      <article
        v-if="!orders.length"
        class="media py-3 px-3 my-0 has-background-white"
      >
        <div class="media-content">
          <div class="content">
            <p>Seus pedidos aparecerão aqui.</p>
          </div>
        </div>
      </article>

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

          <div>
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
            <!-- <span v-else class="tag mr-2 is-white">{{ 'Pendente' }}</span> -->
            <button
              @click="updateOrderStatus(null, order.id)"
              v-if="isDev"
              class="button is-small"
            >
              limpar
            </button>
          </div>

          <div v-if="!order.status" class="level mt-3">
            <div class="level-item mr-2">
              <button
                @click="updateOrderStatus(1, order.id)"
                class="button is-small is-success is-rounded is-fullwidth"
              >
                <span class="icon is-small">
                  <svg-icon type="mdi" :path="accept_icon" />
                </span>
                <span>Aceitar</span>
              </button>
            </div>
            <div class="level-item">
              <button
                @click="updateOrderStatus(5, order.id)"
                class="button is-small is-danger is-rounded is-fullwidth"
              >
                <span class="icon is-small">
                  <svg-icon type="mdi" :path="refuse_icon" />
                </span>
                <span>Recusar</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/mixins';
// import { updateOrderStatus } from '../mixins';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCancel, mdiThumbUp } from '@mdi/js';

export default {
  mixins: [formatDate],
  components: { SvgIcon },
  name: 'OrdersList',
  props: {
    orders: Array,
    selected: String,
  },
  data() {
    return {
      accept_icon: mdiThumbUp,
      refuse_icon: mdiCancel,
      isDev: process.env.NODE_ENV === 'development' ? true : false,
    };
  },
  methods: {
    updateOrderStatus(status, order_id) {
      this.$emit('update-order-status', status, order_id);
    },
  },
};
</script>
