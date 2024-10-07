<template>
  <div>
    <LoginLayout />
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import LoginLayout from '@/components/LoginLayout.vue';


export default {
  components: {
    LoginForm,
    LoginLayout
  }
}
</script>
