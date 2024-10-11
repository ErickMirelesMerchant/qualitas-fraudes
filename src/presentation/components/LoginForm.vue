<template>
  <div class="body-base">
    <div class="login-nav">
      <img class="ml-4" src="assets/logos/logo_qualitas.png" alt="Logo" >
    </div>

    <v-card class="login-container pa-8">
    <!-- Sección de título e imagen -->
    <div class="login-titles">
      <div class="login-logo">
        <v-img 
          src="/assets/logos/logomark.png" 
          alt="Logo" 
          ></v-img>
      </div>
      <div class="login-title-text">
        <h2>Inicia sesión</h2>
        <p>¡Bienvenido de vuelta! Por favor ingresa tus datos</p>
      </div>
    </div>

    <!-- Formulario de login -->
    <v-form v-model="isFormValid" @submit.prevent="openDialog" class="login-box">
      <div class="input-group">
        <label for="email">Correo</label>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          placeholder="Ingresa tu correo"
          required
          variant="outlined"
          id="email"
        ></v-text-field>
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          required
          variant="outlined"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="showPassword = !showPassword"
          id="password"
          ></v-text-field>
      </div>

      <!-- Opciones adicionales: recordar y olvidé contraseña -->
      <div class="options">
        <label>
          <v-checkbox
            v-model="rememberMe"
            label="Recuérdame"
          ></v-checkbox>
        </label>
        <a @click.prevent="goToForgotPassword">Olvidé contraseña</a>
      </div>

      <!-- Botón de login -->
      <v-btn
        class="login-button"
        type="submit"
        :disabled="!isFormValid"
        color="primary"
      >
        Ingresar
      </v-btn>
    </v-form>

    <!-- Diálogo de confirmación -->
    <v-dialog v-model="dialog" persistent max-width="600px" width="100%">
      <v-card class="dialog-box">
        <div class="dialog-image">
          <v-img
            src="/assets/icons/Warning-icon.svg"
            alt="Warning icon"
            height="48"
            max-width="48"
          ></v-img>
          <v-img
            src="/assets/icons/dialog-background.svg"
            alt="Dialog-bg"
            class="dialog-bg-icon"
            max-height="auto"
            ></v-img>
        </div>
        <div class="dialog-body">
          <h3>Es hora de actualizar tu contraseña</h3>
          <p>
            Por tu seguridad, debes actualizar tu contraseña cada 90 días. Tu
            contraseña está a punto de vencer.
          </p>
          <p>
            Cambia tu contraseña para evitar interrupciones. Solo te tomará un
            momento.
          </p>
        </div>
        <div class="dialog-buttons">
          <v-btn class="secondary-btn" text @click="dialog = false">Cerrar</v-btn>
          <v-btn class="primary-btn" color="primary" @click="confirmLogin">Actualizar</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
      email: '',
      emailRules: [
      value => !!value || 'Este campo no puede quedar vacío',
      value => /.+@.+\..+/.test(value) || 'Debe ingresar un correo válido',
      ],
      password: '',
      rememberMe: false,
      showPassword: false,
      dialog: false,
    }),
  methods: {
    showSpinner() {
      this.$emit('is-loading')
      setTimeout(() => {
        this.$emit('is-loading')
      }, 2500);
    },
    openDialog() {
      this.showSpinner()
      this.dialog = true;
    },
    confirmLogin() {
      this.dialog = false;
      this.$router.push('/change-password');
    },
    handleLogin() {
      alert(`Correo: ${this.email}, Contraseña: ${this.password}, Recordarme: ${this.rememberMe}`);
      this.dialog = false;
    },
    goToForgotPassword() {
      this.$router.push('/recover-password');
    },
    togglePassword() {
      showPassword = !showPassword
    },
  }
};

</script>

<style scoped>

.login-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 4rem;
  background-color: transparent
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
  gap: 12px;
  box-shadow: 0px 1px 3px 0px #1018280F, 0px 1px 3px 0px #1018281A;
}

.login-logo .v-img {
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

.mdi {
  color: #667085;
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
  border-radius: 8px !important;
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
  gap: 0.3rem;
  margin-bottom: 1rem;
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

.options label input {
  margin-right: 5px;
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

.login-button, .v-btn {
  font-family: 'Inter SemiBold', sans-serif;
  width: 100%;
  height: 44px;
  padding: 10px;
  background-color: #0096AE !important;
  color: white;
  border: none;
  border-radius: 8px !important;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  /* line-height: 24px; */
  text-align: center;
}

.login-button:hover, .v-btn:hover {
  background-color: #017182;
}


input[type="checkbox"], .v-checkbox .v-selection-control__input {
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

input[type="checkbox"]:checked, .v-selection-control--dirty .v-selection-control__input > .v-icon, .v-checkbox:checked {
  background: url("~/assets/icons/Checked.svg") center center no-repeat;
  background-size: auto;
  border-color: #0096ae !important;
  color: #0096AE !important;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegúrate de que el diálogo esté en la parte superior */
}

.dialog-box {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
}

.dialog-image {
  display: flex;
  position: relative;
}

.dialog-image img:first-child, .dialog-image .v-img:first-child {
  position: relative;
  left: -4px;
  top: -4px;
  height: 48px;
}

.dialog-bg-icon {
  width: 12rem;
  max-height: fit-content;
  position: absolute;
  top: -22px;
  left: -22px;
}

.dialog-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
}

.dialog-body h3 {
  margin: 0;
}

.dialog-box img {
  float: left;
}

.dialog-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

.dialog-box h3 {
  font-family: 'Inter SemiBold', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
  color: #101828;
  position: relative;
}

.dialog-box p {
  font-family: 'Inter Regular', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #475467;
  margin: 0;
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 6px;
}

.dialog-buttons button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 270px;
  height: 44px;
  padding: 10px 16px;
  border-radius: 8px;
  font-family: 'Inter SemiBold', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.dialog-buttons .primary-btn {
  background-color: #0096AE;
  color: white;
  border: none;
  box-shadow: 0px 1px 2px 0px #1018280D;
}

.dialog-buttons .primary-btn:hover {
  background-color: #017182;
}

.secondary-btn, .v-btn.secondary-btn {
  background-color: #FFFFFF !important;
  color: #344054;
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px 0px #1018280D;
}

.dialog-buttons .secondary-btn:hover {
  background-color: #D0D5DD !important;
}

.login-nav {
  background-color: #F9FAFB;
  padding: 0.5rem 0 0 2rem;
}
.body-base {
  background: url("~/assets/images/background-pattern.png") no-repeat center center;
  background-color: #F9FAFB;
  width: 100vw;
  height: 110vh;
  position: absolute;
}

@media screen and (max-width: 586px) {
  .login-nav {
    padding: 0.5rem 0 0.5rem;
  }
  .login-box {
    width: 100%;
  }
  .login-container {
    margin: 0 1.5rem;
    padding-top: 5rem;
  }
  .login-titles {
    width: 100%;
  }
  .dialog-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }
  .dialog-overlay {
    padding: 0 1rem
  }
  .dialog-buttons button {
    width: 100%;
  }
}

@media screen and (max-width: 330px) {
  .options {
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
