<template>
  <div class="body-base">
    <div class="login-container">
      <div class="login-titles">
        <div class="login-logo">
          <img src="assets/logos/logomark.png" alt="Logo" />
        </div>
        <div class="login-title-text">
          <h2>Inicia sesión</h2>
          <p>¡Bienvenido de vuelta! Por favor ingresa tus datos</p>
        </div>
      </div>
      <div class="login-box">
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Correo</label>
            <input type="email" id="email" v-model="email" placeholder="Ingresa tu correo" required />
          </div>
          <div class="input-group">
            <label for="password">Contraseña</label>
            <div class="password-container">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Contraseña" required />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
              </button>
            </div>
          </div>
          <div class="options">
            <label>
              <input type="checkbox" v-model="rememberMe" /> Recuérdame
            </label>
            <a @click.prevent="goToForgotPassword">Olvidé contraseña</a>
          </div>
          <button type="submit" class="login-button">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false
    };
  },
  methods: {
    handleLogin() {
      alert(`Correo: ${this.email}, Contraseña: ${this.password}, Recordarme: ${this.rememberMe}`);
    },
    goToForgotPassword() {
      this.$router.push('/recover-password');  // Navegar a la página de recuperación de contraseña
    }
  }
};
</script>

<style scoped>
.login-container {
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

.login-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.login-title-text {
  font-family: 'Inter Regular';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #475467;
}

.login-box {
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

.login-logo img {
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
  margin-bottom: 30px;
  font-family: 'Inter', sans-serif;
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
  justify-content: space-between;
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

}

.login-button {
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

.login-button:hover {
  background-color: #017182;
}


input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  cursor: pointer;
  border: 1px solid #d0d5dd;
  min-height: 15px;
  min-width: 15px;
  border-radius: 0.250rem;
}

input[type="checkbox"]:checked {
  background: url("../assets/icons/Checked.svg") center center no-repeat;
  background-size: auto;
  border-color: #0096ae !important;
}

@media screen and (max-width: 768px) {
  .login-box {
    width: calc(100% - 2rem);
  }
}

@media screen and (max-width: 350px) {
  .options {
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
