<template>
  <div class="body-base">
    <div class="recover-nav">
      <img class="ml-4" src="assets/logos/logo_qualitas.png" alt="Logo" />
    </div>

    <v-card class="recover-container pa-8">
      <div class="recover-titles">
        <div class="recover-logo">
          <v-img src="/assets/logos/logomark.png" alt="Logo"></v-img>
        </div>
        <div class="recover-title-text">
          <h2>Recuperar Contraseña</h2>
          <p>
            ¿Olvidaste tu contraseña? Escribe tu correo y te enviaremos un link
            para recuperarla
          </p>
        </div>
      </div>

      <v-form v-model="isFormValid" @submit.prevent="handleForgotPassword" class="recover-box">
        <div class="input-group">
          <label for="email">Correo</label>
          <v-text-field v-model="forgotEmail" :rules="forgotEmailRules" placeholder="Ingresa tu correo" required
            variant="outlined" id="email"></v-text-field>
        </div>

        <v-btn class="recover-button" type="submit" :disabled="!isFormValid">
          Enviar
        </v-btn>

        <div class="options">
          <a @click.prevent="goBackToLogin"><v-img src="/assets/icons/go-back-login.svg" alt="recover"></v-img>
            Iniciar Sesión</a>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    forgotEmail: "",
    forgotEmailRules: [
      (value) => !!value || "Este campo no puede quedar vacío",
      (value) => /.+@.+\..+/.test(value) || "Debe ingresar un correo válido",
    ],
  }),
  methods: {
    handleForgotPassword() {
      this.$emit("forgot-password");
    },

    goBackToLogin() {
      this.$router.push("/");
    },
  },
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
  background-color: transparent;
}

.recover-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 440px;
}

.recover-title-text {
  font-family: "Inter Regular", sans-serif;
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
  box-shadow: 0px 1px 3px 0px #1018280f, 0px 1px 3px 0px #1018281a;
}

.recover-logo .v-img {
  width: 50px;
}

h2 {
  font-family: "Montserrat", sans-serif;
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
  font-family: "Inter", sans-serif;
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
  font-family: "Inter Medium", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}

.input-group input {
  font-family: "Inter Regular", sans-serif;
  width: -webkit-fill-available !important;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  padding: 10px 14px;
  gap: 8px;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px 0px #1018280d;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #667085;
}

.input-group input:focus,
.input-group input:focus-within,
.input-group input:focus-visible {
  border: 0.0625rem solid #99cad7;
  box-shadow: 0.1875rem 0.1875rem 0 #c2dfe7, -0.1875rem -0.1875rem 0 #c2dfe7,
    0.1875rem -0.1875rem 0 #c2dfe7, -0.1875rem 0.1875rem 0 #c2dfe7;
  outline: none;
}

.password-container {
  position: relative;
}
.v-card--variant-elevated {
  box-shadow: none;
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
  font-family: "Inter", sans-serif;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.options label {
  display: flex;
  align-items: center;
  font-family: "Inter Medium", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #344054;
}

.options a {
  color: #006e80;
  text-decoration: none;
  font-family: "Inter SemiBold", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  display: flex;
}

.options a .v-img {
  margin-right: 0.25rem;
  width: 18px;
}

.recover-button,
.v-btn {
  font-family: "Inter SemiBold", sans-serif !important;
  width: 100%;
  height: 44px;
  padding: 10px;
  background-color: #0096ae !important;
  color: white;
  border: none;
  border-radius: 8px !important;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  opacity: 1;
}

.recover-button:hover,
.v-btn:hover {
  background-color: #017182;
  opacity: 1;
}

.recover-nav {
  background-color: #f9fafb;
  padding: 0.5rem 0 0 2rem;
}

.body-base {
  background: url("~/assets/images/background-pattern.png") no-repeat center center;
  background-color: #f9fafb;
  width: 100vw;
  height: 110vh;
  position: absolute;
}


@media screen and (max-width: 586px) {
  .recover-nav {
    padding: 0.5rem 0 0.5rem;
  }

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
