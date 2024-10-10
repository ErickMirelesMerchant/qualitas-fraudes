<template>
  <div>
    <LoginLayout />
    <Loader v-if="loading"/>
    <LoginForm @is-loading="toggleIsLoading"/>
  </div>
</template>

<script>
import Loader from '~/presentation/components/Loader.vue';
import LoginForm from '~/presentation/components/LoginForm.vue';
import LoginLayout from '~/presentation/components/LoginLayout.vue';


export default {
  components: {
    LoginForm,
    Loader,
    LoginLayout
  },
  data() {
    return {
      loading : false,
    };
  },
  methods: {
    toggleIsLoading() {
      this.loading = !this.loading;
    },
  },
}
</script>
