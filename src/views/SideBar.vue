<template>
  <div class="sidebar has-background-dark">
    <a
      v-for="(item, index) in menu"
      :key="index"
      class="sidebar-item"
      :class="{ active: item.title === active }"
      :href="'#' + item.title"
      @click.prevent="active = item.title"
    >
      <svg-icon type="mdi" :path="item.icon"></svg-icon>
      <small>{{ item.title }}</small>
    </a>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReceipt, mdiExitRun } from '@mdi/js';

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
/*         {
          title: 'Ajuda',
          icon: mdiLightbulb,
        }, */
        {
          title: 'Sair',
          icon: mdiExitRun,
        },
      ],
    };
  },
  watch: {
    active() {
      if (this.active === 'Sair') {
        localStorage.removeItem('sid');
        localStorage.removeItem('uid');
        this.$router.push('entrar');
      }
    },
  },
};
</script>
