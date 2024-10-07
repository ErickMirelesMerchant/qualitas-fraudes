<template>
  <div>
    <LoginLayout />
    <ChangePassword v-if="!showChangedPassword" @changed-password="toggleChangedPassword"/>
    <LoginSuccessFullMessage
      v-else
      @back-to-login="toggleChangedPassword"
      :hasButton="hasButton"
      :title_message="title_message"
      :subtitle_message="subtitle_message"
    />
  </div>
</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue';
import LoginLayout from '@/components/LoginLayout.vue';
import LoginSuccessFullMessage from '@/components/LoginSuccessFullMessage.vue';

export default {
  components: {
    LoginLayout,
    ChangePassword,
    LoginSuccessFullMessage,
  },
  data() {
    return {
      showChangedPassword: false, // Estado para controlar qué componente mostrar
      hasButton: false,
      title_message: '',
      subtitle_message: ''
    };
  },
  methods: {
    toggleChangedPassword() {
      this.showChangedPassword = !this.showChangedPassword;
      this.hasButton = true;
      this.title_message = '¡Tu contraseña ha sido actualizada!';
      this.subtitle_message = 'Ya puedes iniciar sesión en tu cuenta';
    },
  },
};
</script>
