<template>
  <div class="wrapper">
    Nuxt module playground!

    <HPCaptcha/>
    {{ isVerified }}
    <HPCaptchaImg v-model="isVerified"/>
  </div>
</template>

<script setup>
const isVerified = ref(false);

</script>

<style scoped>
.wrapper{
  width: screen;
  height: 100vh;
  background-color: red;
}
</style>