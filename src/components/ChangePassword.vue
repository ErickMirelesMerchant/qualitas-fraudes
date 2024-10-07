<template>
  <div class="change-password-container">
    <div class="change-password-titles">
      <div class="change-password-logo">
        <img src="assets/logos/logomark.png" alt="Logo" />
      </div>
      <div class="change-password-title-text">
        <h2>Configura tu nueva contraseña</h2>
        <p>Debe tener al menos 8 caracteres, una mayúscula y un símbolo especial</p>
      </div>
    </div>
    <div class="change-password-box">
      <form @submit.prevent="handleChangePassword">
        <div class="input-group">
          <label for="password">Nueva contraseña</label>
          <div class="password-container">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="••••••••" required />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
            </button>
          </div>
        </div>
        <div class="input-group">
          <label for="passwordConfirm">Confirmar contraseña</label>
          <div class="password-container">
            <input :type="showPasswordConfirm ? 'text' : 'password'" id="passwordConfirm" v-model="passwordConfirm" placeholder="••••••••" required />
            <button type="button" class="toggle-password" @click="showPasswordConfirm = !showPasswordConfirm">
              <i :class="showPasswordConfirm ? 'far fa-eye-slash' : 'far fa-eye'"></i>
            </button>
          </div>
        </div>
        <button type="submit" class="change-password-button">Cambiar contraseña</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    password: '',
    passwordConfirm: '',
    rememberMe: false,
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
background-color: transparent
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
font-family: 'Inter Regular';
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

.change-password-logo img {
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
margin-bottom: 15px 0 30px 0 ;
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

.input-group, .input-group-confirm {
text-align: left;
width: 100%;
}

.input-group label, .input-group-confirm label {
display: block;
color: #344054;
margin-bottom: 5px;
font-family: 'Inter Medium', sans-serif;
font-size: 14px;
font-weight: 500;
line-height: 20px;
text-align: left;

}

.input-group input, .input-group-confirm input {
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

.input-group input:focus, .input-group input:focus-within, .input-group input:focus-visible, .input-group-confirm input:focus, .input-group-confirm input:focus-within, .input-group-confirm input:focus-visible {
border: 0.0625rem solid #99cad7;
box-shadow: 0.1875rem 0.1875rem 0 #c2dfe7,
  -0.1875rem -0.1875rem 0 #c2dfe7, 0.1875rem -0.1875rem 0 #c2dfe7,
  -0.1875rem 0.1875rem 0 #c2dfe7;
outline: none;
}

.password-container, .password-container-confirm {
position: relative;
}

.toggle-password, .toggle-password-confirm {
position: absolute;
right: 10px;
top: 50%;
transform: translateY(-50%);
background: none;
border: none;
cursor: pointer;
}

.change-password-button {
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

.change-password-button:hover {
background-color: #017182;
}

@media screen and (max-width: 768px) {
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
