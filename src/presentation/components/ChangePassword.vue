<template>
  <div class="body-base">
    <div class="login-nav">
      <img class="ml-4" src="assets/logos/logo_qualitas.png" alt="Logo" />
    </div>
    <v-card class="change-password-container pa-8">
      <div class="change-password-titles">
        <div class="change-password-logo">
          <v-img src="/assets/logos/logomark.png" alt="Logo"></v-img>
        </div>
        <div class="change-password-title-text">
          <h2>Configura tu nueva contraseña</h2>
          <p>
            Debe tener al menos 8 caracteres, una mayúscula y un símbolo especial
          </p>
        </div>
      </div>
      <v-form @submit.prevent="handleChangePassword" class="change-password-box">
        <div class="input-group">
          <label for="password">Nueva contraseña</label>
          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
            :rules="passwordRules" variant="outlined" :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click:append-inner="showPassword = !showPassword" id="password"></v-text-field>
        </div>
        <div class="input-group">
          <label for="password">Confirmar contraseña</label>
          <v-text-field v-model="passwordConfirm" :type="showPasswordConfirm ? 'text' : 'password'"
            placeholder="••••••••" required :rules="passwordConfirmRules" variant="outlined"
            :append-inner-icon="showPasswordConfirm ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click:append-inner="showPasswordConfirm = !showPasswordConfirm" id="password"></v-text-field>
        </div>
        <v-btn class="change-password-button" type="submit">
          Cambiar contraseña
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      passwordRules: [
        value => (value && value.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
        value => /[A-Z]/.test(value) || 'La contraseña debe tener al menos una mayúscula',
        value => /[^A-Za-z0-9]/.test(value) || 'La contraseña debe tener al menos un símbolo especial',
      ],
      passwordConfirm: '',
      passwordConfirmRules: [
        (value) => {
          if (value !== this.password) {
            return 'Las contraseñas no coinciden';
          }
          return true;
        },
      ],
      showPassword: false,
      showPasswordConfirm: false,
    };
  },
  methods: {
    handleChangePassword() {
      this.$emit('changed-password')
    },
  }
};
</script>

<style scoped>
.change-password-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 4rem;
  background-color: transparent;
}

.change-password-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 380px;
  margin-bottom: 2rem;
}

.change-password-title-text {
  font-family: 'Inter Regular', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #475467;
}

.change-password-box {
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
.v-card--variant-elevated {
  box-shadow: none;
}
.change-password-logo .v-img {
  width: 50px;
}

h2 {
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
  margin-bottom: 15px 0 30px 0;
  font-family: 'Inter', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.far {
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

.input-group input:focus,
.input-group input:focus-within,
.input-group input:focus-visible {
  border: 0.0625rem solid #99cad7;
  box-shadow: 0.1875rem 0.1875rem 0 #c2dfe7,
    -0.1875rem -0.1875rem 0 #c2dfe7, 0.1875rem -0.1875rem 0 #c2dfe7,
    -0.1875rem 0.1875rem 0 #c2dfe7;
  outline: none;
}

.mdi {
  color: #667085;
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

.change-password-button, .v-btn {
  color: #4a4a4a;
  font-family: 'Inter SemiBold', sans-serif;
  width: 100%;
  height: 44px;
  padding: 10px;
  background-color: #0096AE !important;
  border: none;
  border-radius: 8px !important;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.change-password-button:hover {
  background-color: #017182;
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

  .change-password-box {
    width: calc(100% - 2rem);
  }

  .change-password-container {
    margin: 0 1.5rem;
    padding-top: 5rem;
  }

  .change-password-titles {
    width: 100%;
  }
}
</style>
