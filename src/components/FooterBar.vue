<template>
  <footer>
    <div class="content level">
      <div class="level-left">
        <div class="level-item">
          <p>Pedidos: {{ orders.length }}</p>
        </div>
        <div class="level-item">
          <p>Total: {{ formatPrice(todayOrdersTotal) }}</p>
        </div>
      </div>
      <div class="level-right">
        <p>
          Bemyhelp Essencial - {{ new Date().getFullYear() }} - Versão:
          {{ appVer }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { formatPrice } from '@/mixins';

export default {
  name: 'FooterBar',
  mixins: [formatPrice],
  props: {
    orders: Array,
  },
  data() {
    return {
      appVer: '1.0.0',
    };
  },
  computed: {
    todayOrdersTotal() {
      return this.orders.reduce((a, b) => +a + +b.total, 0);
    },
  },
};
</script>
