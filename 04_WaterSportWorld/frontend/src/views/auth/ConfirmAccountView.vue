<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from "../../api/AuthAPI";
import { inject } from "vue";

const toast = inject("toast");
const route = useRoute();
const router = useRouter();
const { token } = route.params;

onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyAccount(token);
    toast.open({
      message: data.msg,
      type: "success",
    });
    setTimeout(() => {
      router.push({ name: "login" });
    }, 3000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});
</script>

<template>
  <h1>Verificar cuenta</h1>
</template>
<style scoped>
h1 {
  font-size: 4rem;
  color: #000080;
  opacity: 0.7;
  text-align: center;
  margin: 0;
}
</style>
