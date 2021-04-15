<template>
  <div class="columns mx-0 is-mobile">
    <div class="column is-narrow px-0 pb-0">
      <side-bar />
    </div>
    <div class="column px-0 pb-0">
      <header-bar v-if="place" :name="place.name" :status="place.status" />
      <div class="columns px-0 my-0 mx-0">
        <div
          class="column is-one-quarter pr-0 pb-0 py-0 px-0"
        >
          <orders-list
            :orders="orders"
            :selected="selected_order ? selected_order.id : null"
            @set-order="selectOrder($event)"
            @set-status="status = $event"
            @updated="getOrders(), notifyOrders(false)"
          />
        </div>
        <div class="order-wrapper column px-0 pb-0 py-0">
          <order
            :order="selected_order"
            :place="place"
            @updated="getOrders(), notifyOrders(false)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config';
import HeaderBar from '@/components/HeaderBar.vue';
import SideBar from '@/views/SideBar.vue';
import OrdersList from '@/views/OrdersList.vue';
import Order from '@/views/Order.vue';
// const { ipcRenderer } = require('electron');
// const sound = require('sound-play');

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
      status: null,
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
        .get(config.api_url + '/get_store_orders/' + vm.store_id)
        .then(response => {
          let orders = response.data;
          if (orders.length) {
            orders.sort((a, b) => b.id - a.id);
            for (let o = 0; o < orders.length; o++) {
              let items = orders[o].items;
              for (let i = 0; i < items.length; i++) {
                if (items[i].sale_price == '0.00') {
                  items[i].sale_price = null;
                }
              }
            }

            this.$set(this, 'orders', orders);

            let pending = orders.some(order => !order.status);
            if (pending) {
              vm.notifyOrders(true);
            }
          }
        })
        .finally(() => (vm.componentKey += 1));
    },
    selectOrder(order) {
      this.$set(this, 'selected_order', order);
    },
    notifyOrders() {
      /* let play = setInterval(() => {
        sound.play('C:\\new_order.mp3');
      }, 3000);
      if (!value) clearInterval(play); 

      ipcRenderer.send('notification'); */
    },
  },
};
</script>
