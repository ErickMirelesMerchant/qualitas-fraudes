<template>
  <div>
    <RecoverPassword v-if="!showForgotPassword" @forgot-password="toggleForgotPassword"/>
    <LoginSuccessFullMessage
      v-else
      :hasButton="hasButton"
      :title_message="title_message"
      :subtitle_message="subtitle_message"
    />
  </div>
</template>

<script>
import LoginSuccessFullMessage from '~/presentation/components/LoginSuccessFullMessage.vue';
import RecoverPassword from '~/presentation/components/RecoverPassword.vue';

export default {
  components: {
    RecoverPassword,
    LoginSuccessFullMessage,
  },
  data() {
    return {
      showForgotPassword: false, // Estado para controlar qué componente mostrar
      hasButton: false,
      title_message: '',
      subtitle_message: ''
    };
  },
  methods: {
    toggleForgotPassword() {
      this.showForgotPassword = !this.showForgotPassword;
      this.title_message = 'Hemos enviado las instrucciones';
      this.subtitle_message = 'Revisa tu bandeja de entrada y sigue las instrucciones que enviamos a [correo_usuario] ';
    },
  },
};
</script>
