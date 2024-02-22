<script setup>
import AuthAPI from "../../api/AuthAPI";
import { reset } from "@formkit/vue";
import { inject } from "vue";

const toast = inject("toast");

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthAPI.register(formData);
    toast.open({
      message: data.msg,
      type: "success",
    });
    reset("registerForm");
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
  <h1>Crea una cuenta</h1>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu Nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El Nombre es obligatorio',
        length: 'El nombre es muy corto',
      }"
    />
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de Registro"
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
      placeholder="Password de Usuario - Min 8 Caracteres"
      validation="required|length:8"
      :validation-messages="{
        required: 'El Password es obligatorio',
        length: 'El password debe contener al menos 8 caracteres',
      }"
    />
    <FormKit
      type="password"
      label="Repetir Password"
      name="password_confirm"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
      placeholder="Repite el password"
      validation="required|confirm"
      :validation-messages="{
        required: 'Repetir password es obligatorio',
        confirm: 'Los passwords no son iguales',
      }"
    />
    <FormKit type="submit">Crear Cuenta</FormKit>
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
