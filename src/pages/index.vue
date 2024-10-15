<template>
  <div>
    <Loader v-if="loading"/>
    <LoginForm @is-loading="toggleIsLoading"/>
  </div>
</template>

<script>
import Loader from '~/kernel/components/loader/Loader.vue';
import LoginForm from '~/presentation/components/LoginForm.vue';


export default {
  components: {
    LoginForm,
    Loader,
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
