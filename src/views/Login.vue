<template>
  <section class="login">
    <div class="columns is-multiline">
      <div
        class="column is-half half-background"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/woman-picking-oranges-edit.jpg') + ')',
        }"
      ></div>

      <div
        class="column is-half my-0 py-0 doodle-boy"
        :style="{
          backgroundImage: 'url(' + require('@/assets/boy.svg') + ')',
        }"
      >
        <div class="columns is-multiline is-vcentered is-centered">
          <div class="column is-half has-text-centered">
            <div
              v-if="not_allowed"
              class="notification is-danger is-light py-2"
            >
              Você precisa estar logado para acessar esse conteúdo.
            </div>

            <h1 class="subtitle">
              Bem-vindo(a) ao Gestor de Pedidos do Bemyhelp!
            </h1>
            <h1 class="title">Entre em sua conta</h1>
            <form
              @submit.prevent="logUser"
              action="javascript:void(0)"
              autocomplete="on"
            >
              <div class="field">
                <label class="label" for="email">E-mail</label>
                <div class="control has-icons-left">
                  <input
                    ref="email"
                    v-model="email.value"
                    type="email"
                    id="email"
                    class="input is-rounded is-medium"
                    :class="{ 'is-danger': login_fail }"
                    required
                    autocomplete="on"
                    autofocus
                  />
                  <span class="icon is-small is-left">
                    <svg-icon type="mdi" :path="email.icon" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label" for="password">Senha</label>
                <div class="control has-icons-left">
                  <input
                    ref="password"
                    id="password"
                    type="password"
                    v-model="password.value"
                    class="input is-rounded is-medium"
                    :class="{ 'is-danger': login_fail }"
                    required
                  />
                  <span class="icon is-small is-left">
                    <svg-icon type="mdi" :path="password.icon" />
                  </span>
                </div>
                <p v-if="login_fail" class="help is-danger">
                  Ops, seu e-mail ou senha podem estar errados, verifique por
                  favor.
                </p>
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="mt-5 button is-fullwidth is-success is-large is-rounded"
                >
                  Entrar
                </button>
              </div>
            </form>

            <!-- help 
            <button class="button is-text mt-4">Preciso de ajuda</button>
            <div class="modal">
              <div class="modal-background"></div>
              <div class="modal-content box">
                <h3 class="title">Como podemos ajudar você?</h3>
              </div>
              <button class="modal-close is-large" aria-label="close"></button>
            </div>
            /help -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmail, mdiKey } from '@mdi/js';
import config from '../config';
import axios from 'axios';

export default {
  name: 'Login',
  components: { SvgIcon },
  data() {
    return {
      uid: null,
      sid: null,
      login_fail: false,
      email: {
        value: null,
        icon: mdiEmail,
      },
      password: {
        value: null,
        icon: mdiKey,
      },
      not_allowed: false,
    };
  },
  mounted() {
    if (localStorage.getItem('not_allowed')) this.not_allowed = true;
  },
  methods: {
    logUser() {
      let vm = this;
      let formData = new FormData();
      formData.append('email', this.email.value);
      formData.append('password', this.password.value);
      axios.post(config.api_url + '/user/login', formData).then(response => {
        let data = response.data;
        if (data.error) {
          vm.$refs.password.focus();
          vm.login_fail = true;
          return;
        }
        vm.uid = data.uid;
        vm.sid = data.store.id;
        localStorage.setItem('uid', data.uid);
        localStorage.setItem('sid', data.store.store.id);
        vm.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>
.login .columns {
  height: 100vh;
  margin: 0;
}
.half-background {
  height: 100%;
  background-size: cover;
  background-position: center left;
  background-repeat: no-repeat;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.7618);
}
.doodle-boy {
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: calc(100vw / 7) auto;
}
</style>
