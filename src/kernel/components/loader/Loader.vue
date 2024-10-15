<template>
  <div class="spinner-overlay">
    <span class="loader"></span>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Cargando'
      };
    },
  };
</script>

<style scoped>
.loader {
  width: 4rem;
  height: 4rem;
  border: 0.5rem solid #f9fafb;
  border-bottom-color: #0096ae;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
  background-color: white;
  background-image: url("~/assets/images/background-pattern.png");
  z-index: 9999;
}

p {
  font-family: 'Inter Medium', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
  color: #344054;
}
</style>