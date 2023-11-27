<script setup>
import AuthAPI from "../../api/AuthAPI";
import { useRouter } from "vue-router";
import { inject } from "vue";

const toast = inject("toast");
const router = useRouter();

const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await AuthAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", token);
    router.push({ name: "my-bookings" });
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
};

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};
</script>

<template>
  <h1>Inicia sesión</h1>

  <FormKit
    id="loginForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de Usuario"
      validation="required|email"
      :validation-messages="{
        required: 'El Email es obligatorio',
        email: 'Email no válido',
      }"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
      placeholder="Password de Usuario"
      validation="required"
      :validation-messages="{
        required: 'El Password es obligatorio',
      }"
    />

    <FormKit type="submit">Iniciar sesión</FormKit>
  </FormKit>
</template>
<style scoped>
h1 {
  font-size: 4rem;
  color: #000080;
  opacity: 0.7;
  text-align: center;
  margin: 0;
}
.formkit-form {
  margin: 0 auto;
  border: none;
  font-size: larger;
  color: #fff;
  text-transform: uppercase;
  color: rgba(161, 51, 104);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 5px;
}
</style>
