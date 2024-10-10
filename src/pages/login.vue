<template>
  <div>
    <LoginLayout />
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '~/presentation/components/LoginForm.vue';
import LoginLayout from '~/presentation/components/LoginLayout.vue';


export default {
  components: {
    LoginForm,
    LoginLayout,
  }
}
</script>
