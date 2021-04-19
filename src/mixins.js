import axios from 'axios';
import config from '../src/config';

export const formatPrice = {
  methods: {
    formatPrice(amount) {
      amount = Number(amount);
      return amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
};

export const formatDate = {
  methods: {
    formatDate(timestamp, with_time = false) {
      let date = new Date(timestamp);
      return with_time
        ? date.toLocaleDateString() + ' às ' + date.toLocaleTimeString()
        : date.toLocaleDateString();
    },
  },
};

export const timeGreeting = {
  computed: {
    timeGreeting() {
      let hour = new Date().getHours();

      if (hour >= 0 && hour <= 11) return 'Bom dia';
      if (hour >= 12 && hour <= 17) return 'Boa tarde';
      if (hour >= 18 && hour <= 23) return 'Boa noite';
    },
  },
};

export const updateOrderStatus = {
  methods: {
    updateOrderStatus(status, order_id) {
      let formData = new FormData();
      formData.append('status', status);
      axios
        .post(config.api_url + '/orders/update/' + order_id, formData)
        .then(() => {
          this.getOrders();
          this.notifyOrders(false);
          this.selected_order.status = status;
        });
    },
  },
};

export const loginStatus = {
  data() {
    return {
      logged_out: true,
      not_allowed: false,
    };
  },
};
