<template>
  <div class="message-login-container">
    <div class="message-login-titles">
      <div class="message-login-logo">
        <img src="assets/logos/logomark.png" alt="Logo" />
      </div>
      <div class="message-login-title-text">
        <h2>{{ title_message }}</h2>
        <p>{{ subtitle_message }}</p>
      </div>
      <button
        v-if="hasButton"
        type="button"
        class="message-login-button"
        @click.prevent="goBackToLogin"
      >
        Iniciar Sesión
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasButton: {
      type: Boolean,
      required: false
    },
    title_message: {
      type: String,
      required: true
    },
    subtitle_message: {
      type: String,
      required: true
    }
  },
  methods: {
    goBackToLogin() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.message-login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 4rem;
}


.message-login-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 440px;
}

.message-login-title-text {
  font-family: 'Inter Regular';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #475467;
}

.message-login-logo img {
  width: 50px;
}

h2 {
  color: #4a4a4a;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  color: #101828;
  margin: 0;
}

p {
  color: #6c757d;
  margin: 15px 2rem 15px 2rem;
  font-family: 'Inter', sans-serif;
  text-wrap: pretty;
}

.message-login-button {
  font-family: 'Inter SemiBold', sans-serif;
  width: 100%;
  height: 44px;
  padding: 10px;
  background-color: #0096AE;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.message-login-button:hover {
  background-color: #017182;
}

@media screen and (max-width: 586px) {
  .message-login-container {
    margin: 0 1.5rem;
    padding-top: 5rem;
  }
  .message-login-titles {
    width: 100%;
  }
}
</style>


