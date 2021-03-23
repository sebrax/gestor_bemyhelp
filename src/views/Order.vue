<template>
  <transition name="fade">
    <section class="section py-3 px-4">
      <div v-if="order" class="order" v-cloak>
        <!-- info bar -->
        <div class="level has-background-warning px-5 py-1">
          <div class="level-left">
            <strong
              >{{ '#' + order.id }} |
              {{ order.user_name + ' ' + order.user_lastname }} |
              {{ formatDate(order.created_at, true) }}</strong
            >
          </div>
        </div>

        <!-- Customer info -->
        <div class="columns">
          <div class="column is-full">
            <div class="box">
              <div class="columns is-multiline is-vcentered">
                <div class="column is-1">
                  <p class="title">{{ '#' + order.id }}</p>
                </div>
                <div class="column is-narrow">
                  <h3 class="is-size-6 has-text-weight-semibold mb-1">
                    Cliente:
                  </h3>
                  <p class="is-capitalized">
                    {{ order.user_name + ' ' + order.user_lastname }}<br />
                  </p>
                </div>
                <div class="column is-narrow">
                  <a class="button is-text" :href="'tel:+55' + order.user_cel">
                    <span class="icon is-small">
                      <svg-icon type="mdi" :path="phoneIcon" />
                    </span>
                    <span>
                      {{ order.user_cel }}
                    </span>
                  </a>
                </div>
                <div class="column is-one-third">
                  <div
                    v-if="!order.status || order.status == 0"
                    class="buttons are-small"
                  >
                    <button
                      @click="setOrderStatus(1)"
                      class="button is-success"
                    >
                      Aceitar
                    </button>
                    <button @click="setOrderStatus(5)" class="button is-danger">
                      Recusar
                    </button>
                  </div>

                  <div v-else class="buttons">
                    <button
                      v-if="order.status == 1"
                      @click="setOrderStatus(null)"
                      class="button is-success"
                    >
                      Pronto para Retirar
                    </button>
                    <button
                      v-else-if="order.status == 2"
                      @click="setOrderStatus(3)"
                      class="button is-success"
                    >
                      Pedido Retirado
                    </button>
                    <button
                      v-else-if="order.status == 3"
                      class="button"
                      disabled
                    >
                      Concluído
                    </button>
                  </div>
                </div>
                <div class="column">
                  <button class="button is-primary is-medium">
                    Imprimir Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Items -->
        <div class="columns">
          <div class="column is-full">
            <div class="table-container box">
              <h3 class="is-size-6 has-text-weight-semibold">Itens:</h3>
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Qtd.</th>
                    <th>Item</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in order.items" :key="index">
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                      {{
                        item.sale_price
                          ? formatPrice(item.sale_price)
                          : formatPrice(item.price)
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
        </div>

        <!-- Observations -->
        <div class="columns">
          <div class="column is-full">
            <div class="box">
              <h3 class="is-size-6 has-text-weight-semibold">Observações:</h3>
              <p v-html="order.observations"></p>
            </div>
          </div>
        </div>

        <!-- Delivery -->
        <div class="columns">
          <div class="column is-full">
            <div class="box">
              <div class="columns">
                <div class="column is-full">
                  <h3 class="is-size-6 has-text-weight-semibold">Entrega:</h3>
                  <div
                    v-if="
                      order.delivery_option == 2 || order.delivery_option == 3
                    "
                  >
                    <p>Cliente Retira</p>
                  </div>
                  <div v-else>{{ fullAddress(order) }}</div>
                  <hr />
                  <h3 class="is-size-6 has-text-weight-semibold">Pagamento:</h3>
                  <p v-if="order.payment_type == 1">
                    Pagamento na Entrega - {{ order.payment_method }}
                  </p>
                  <p v-else>
                    Pago online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Totals -->
        <div class="columns">
          <div class="column is-full">
            <div class="table-container box">
              <table class="table is-fullwidth">
                <tbody>
                  <tr>
                    <td><b>Subtotal</b></td>
                    <td>{{ formatPrice(subtotal) }}</td>
                  </tr>
                  <tr>
                    <td><b>Taxa Entrega</b></td>
                    <td>{{ order.fee ? formatPrice(order.fee) : '-' }}</td>
                  </tr>
                  <tr class="has-background-warning">
                    <td><b>Total</b></td>
                    <td>{{ formatPrice(total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="place" class="order section py-0" v-cloak>
        <div class="columns is-multiline">
          <div class="column is-full box px-6 py-6">
            <h1 class="title">
              {{ timeGreeting + ', ' + place.owner.name + '!' }}
            </h1>
            <h2 class="subtitle">
              Você ainda não recebeu pedidos. Quando começarem a chegar, irão
              aparecer ao lado!
            </h2>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import { formatDate } from '@/mixins';
import { formatPrice } from '@/mixins';
import { timeGreeting } from '@/mixins';
import { setOrderStatus } from '@/mixins';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPhone } from '@mdi/js';

export default {
  mixins: [formatDate, formatPrice, timeGreeting, setOrderStatus],
  components: { SvgIcon },
  name: 'Order',
  props: ['order', 'place'],
  data() {
    return {
      phoneIcon: mdiPhone,
    };
  },
  methods: {
    fullAddress(order) {
      return (
        order.address +
        ', ' +
        order.number +
        '<br>' +
        (order.complement ? order.complement + '<br>' : '') +
        order.neighborhood +
        ', ' +
        order.city
      );
    },
  },
  computed: {
    subtotal() {
      const items = this.order.items;
      return items.reduce(
        (a, b) => +a + (b.sale_price ? +b.sale_price : b.price),
        0
      );
    },
    total() {
      const order = this.order;
      return this.subtotal + (order.fee ? order.fee : 0);
    },
  },
};
</script>
