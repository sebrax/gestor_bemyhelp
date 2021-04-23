<template>
  <div class="columns mx-0 is-mobile">
    <div class="column is-narrow px-0 pb-0">
      <side-bar />
    </div>
    <div class="column px-0 pb-0">
      <header-bar
        v-if="place"
        :name="place.name"
        :status="place.status"
        @update-store-status="updateStoreStatus($event)"
      />
      <div class="columns px-0 my-0 mx-0">
        <div class="column is-one-quarter pr-0 pb-0 py-0 px-0">
          <orders-list
            :orders="orders"
            :selected="selected_order ? selected_order.id : null"
            @set-order="selectOrder($event)"
            @update-order-status="updateOrderStatus"
          />
        </div>
        <div class="order-wrapper column px-0 pb-0 py-0">
          <order
            :order="selected_order"
            :place="place"
            @update-order-status="updateOrderStatus"
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
import { updateOrderStatus } from '../mixins';
const { ipcRenderer } = require('electron');

export default {
  mixins: [updateOrderStatus],
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
        .get(config.api_url + '/get_store/' + vm.store_id)
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
        });
    },
    updateStoreStatus(status) {
      let value;
      if (status == 0) {
        value = 1;
      } else {
        value = 0;
      }
      let formData = new FormData();
      formData.append('status', value);

      axios
        .post(
          config.api_url + '/update_store_status/' + this.store_id,
          formData
        )
        .then(() => this.getPlace());
    },
    selectOrder(order) {
      this.$set(this, 'selected_order', order);
    },
    notifyOrders(value) {
      let counter = 0;
      if (value === true && counter == 0) {
        const audio = new Audio(process.env.BASE_URL + 'new_order.mp3');
        setInterval(() => {
          if (counter == 7) {
            clearInterval();
            return;
          } else {
            audio.play();
            counter += 1;
          }
        }, 2000);
      }

      ipcRenderer.send('notification', value);
    },
  },
};
</script>
