<template>
  <div class="sidebar has-background-dark">
    <a
      v-for="(item, index) in menu"
      :key="index"
      class="sidebar-item"
      :class="{ active: index === active }"
      :href="'#' + item.title"
      @click.prevent="active = index"
    >
      <svg-icon type="mdi" :path="item.icon"></svg-icon>
      <small>{{ item.title }}</small>
    </a>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReceipt, mdiLightbulb, mdiExitRun } from '@mdi/js';

export default {
  name: 'SideBar',
  components: { SvgIcon },
  data() {
    return {
      active: 0,
      menu: [
        {
          title: 'Pedidos',
          icon: mdiReceipt,
        },
        {
          title: 'Ajuda',
          icon: mdiLightbulb,
        },
        {
          title: 'Sair',
          icon: mdiExitRun,
        },
      ],
    };
  },
  watch: {
    active() {
      if (this.active == 2) {
        localStorage.removeItem('sid');
        localStorage.removeItem('uid');
        this.$router.push('entrar');
      }
    },
  },
};
</script>
