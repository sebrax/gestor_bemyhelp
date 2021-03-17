<template>
  <div class="columns mx-0">
    <div class="column is-narrow px-0 pb-0">
      <side-bar />
    </div>
    <div class="column px-0 pb-0">
      <header-bar v-if="place" :name="place.name" :status="place.status" />
      <div class="columns px-0 my-0 mx-0">
        <div
          v-if="orders.length"
          class="column is-one-quarter pr-0 pb-0 py-0 px-0"
        >
          <orders-list
            :orders="orders"
            :selected="selected_order ? selected_order.id : null"
            v-on:set-order="selected_order = $event"
          />
        </div>
        <div class="order-wrapper column px-0 pb-0 py-0">
          <order
            :order="selected_order"
            :place="place"
            @updated="getOrders()"
            :key="componentKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import SideBar from '@/views/SideBar.vue';
import OrdersList from '@/views/OrdersList.vue';
import Order from '@/views/Order.vue';
import axios from 'axios';

export default {
  components: {
    HeaderBar,
    SideBar,
    OrdersList,
    Order,
  },
  data() {
    return {
      store_id: 82,
      place: null,
      loading: false,
      orders: [],
      selected_order: null,
      componentKey: 0,
    };
  },
  created() {
    this.store_id = localStorage.getItem('sid');
  },
  mounted() {
    this.loading = true;
    this.getPlace();
    let vm = this;
    setInterval(() => {
      vm.getOrders();
    }, 30000);
  },
  methods: {
    getPlace() {
      let vm = this;
      axios
        .get('http://localhost/essencial/api/get_store/' + vm.store_id)
        .then(response => (vm.place = response.data))
        .finally(() => {
          vm.loading = false;
          vm.getOrders();
        });
    },
    getOrders() {
      let vm = this;
      axios
        .get('http://localhost/essencial/api/get_store_orders/' + vm.store_id)
        .then(response => {
          let orders = response.data;
          if (orders.length) {
            orders.sort((a, b) => b.id - a.id);
            vm.orders = orders;
          }
        })
        .finally(() => {
          vm.componentKey += 1;
        });
    },
  },
};
</script>
