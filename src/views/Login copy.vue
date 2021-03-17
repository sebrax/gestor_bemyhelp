<template>
  <section id="login">
    <div class="hero is-fullheight is-warning">
      <div class="hero-body is-justify-content-center">
        <div class="columns is-vcentered is-centered is-multiline is-mobile">
          <div class="column is-12 has-text-centered">
            <h1 class="title">Entrar</h1>
          </div>

          <div class="column is-12">
            <div class="box">
              <form>
                <div class="field">
                  <label class="label">E-mail</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="email.value"
                      type="email"
                      id="email"
                      class="input"
                      required
                      autocomplete
                    />
                    <span class="icon is-small is-left">
                      <svg-icon type="mdi" :path="email.icon" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Senha</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      v-model="password.value"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <svg-icon type="mdi" :path="password.icon" />
                    </span>
                  </div>
                </div>
                <div class="control">
                  <button
                    type="submit"
                    class="mt-5 button is-fullwidth is-dark is-rounded"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmail, mdiKey } from '@mdi/js';

export default {
  name: 'Login',
  components: { SvgIcon },
  data() {
    return {
      email: {
        value: null,
        icon: mdiEmail,
      },
      password: {
        value: null,
        icon: mdiKey,
      },
    };
  },
};
</script>
