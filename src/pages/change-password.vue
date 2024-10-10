<template>
  <div>
    <LoginLayout />
    <ChangePassword v-if="!showChangedPassword" @changed-password="toggleChangedPassword"/>
    <LoginSuccessFullMessage
      v-else
      :hasButton="hasButton"
      :title_message="title_message"
      :subtitle_message="subtitle_message"
    />
  </div>
</template>

<script>
import ChangePassword from '~/presentation/components/ChangePassword.vue';
import LoginLayout from '~/presentation/components/LoginLayout.vue';
import LoginSuccessFullMessage from '~/presentation/components/LoginSuccessFullMessage.vue';

export default {
  components: {
    LoginLayout,
    ChangePassword,
    LoginSuccessFullMessage,
  },
  data() {
    return {
      showChangedPassword: false,
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
