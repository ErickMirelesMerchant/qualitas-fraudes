<template>
    <div class="recover-container">
      <div class="recover-titles">
        <div class="recover-logo">
          <img src="assets/logos/logomark.png" alt="Logo" />
        </div>
        <div class="recover-title-text">
          <h2>Recuperar Contraseña</h2>
          <p>¿Olvidaste tu contraseña? Escribe tu correo y te enviaremos un link para recuperarla</p>
        </div>
      </div>
      <div class="recover-box">
        <form @submit.prevent="handleForgotPassword">
          <div class="input-group">
            <label for="email">Correo</label>
            <input type="email" id="email" v-model="forgotEmail" placeholder="correo@correo.com" required />
          </div>
          <button type="submit" class="recover-button" @click.prevent="$emit('forgot-password')">Enviar</button>
          <div class="options">
            <a @click.prevent="goBackToLogin"><img src="assets/icons/go-back-login.svg" alt="Login"> Iniciar Sesión</a>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        forgotEmail: ''
      };
    },
    methods: {
      handleForgotPassword() {
        $emit('forgot-password')
      },

      goBackToLogin() {
        this.$router.push('/');
      },
    }
  };
</script>

<style scoped>
.recover-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 2rem;
}

.body-base {
  background: url("../assets/images/background-pattern.png") no-repeat center center;
  background-color: #F9FAFB;
}

.recover-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 440px;
}

.recover-title-text {
  font-family: 'Inter Regular';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #475467;
}

.recover-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23.5rem;
  padding: 32px 32px 40px 32px;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: center;
  flex: 0 1 auto;
  gap: 24px;
  box-shadow: 0px 1px 3px 0px #1018280F, 0px 1px 3px 0px #1018281A;
}

.recover-logo img {
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
  margin: 15px 2rem 30px 2rem;
  font-family: 'Inter', sans-serif;
  text-wrap: pretty;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.input-group {
  text-align: left;
  width: 100%;
}

.input-group label {
  display: block;
  color: #344054;
  margin-bottom: 5px;
  font-family: 'Inter Medium', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;

}

.input-group input {
  font-family: 'Inter Regular', sans-serif;
  width: -webkit-fill-available !important;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  padding: 10px 14px;
  gap: 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 1px 2px 0px #1018280D;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #667085;
}

.input-group input:focus, .input-group input:focus-within, .input-group input:focus-visible {
  border: 0.0625rem solid #99cad7;
  box-shadow: 0.1875rem 0.1875rem 0 #c2dfe7,
    -0.1875rem -0.1875rem 0 #c2dfe7, 0.1875rem -0.1875rem 0 #c2dfe7,
    -0.1875rem 0.1875rem 0 #c2dfe7;
  outline: none;
}

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.options {
  font-family: 'Inter', sans-serif;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.options label {
  display: flex;
  align-items: center;
  font-family: 'Inter Medium', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #344054
}

.options a {
  color: #006E80;
  text-decoration: none;
  font-family: 'Inter SemiBold', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  display: flex;
}

.options a img {
  margin-right: 0.25rem;
}
.recover-button {
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

.recover-button:hover {
  background-color: #017182;
}

@media screen and (max-width: 586px) {
  .recover-box {
    width: calc(100% - 2rem);
  }
  .recover-container {
    margin: 0 1.5rem;
    padding-top: 5rem;
  }
  .recover-titles {
    width: 100%;
  }
}
</style>


