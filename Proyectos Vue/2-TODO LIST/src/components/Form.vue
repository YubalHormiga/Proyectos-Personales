<script setup>
import { reactive, computed } from "vue";
import Alert from "./Alert.vue";

const alert = reactive({
  type: "",
  message: "",
});

const emit = defineEmits([
  "update:tittle",
  "update:date",
  "update:description",
  "saveTask",
]);

const props = defineProps({
  id: {
    type: [String, null],
    require: true,
  },
  tittle: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const validate = () => {
  if (Object.values(props).includes("")) {
    alert.message = "Todos los campos son obligatorios";
    alert.type = "error";
    return;
  }

  emit("saveTask");

  alert.message = "Cita Almacenada Correctamente";
  alert.type = "sucess";
  setTimeout(() => {
    (alert.type = ""), (alert.message = "");
  }, 3000);
};

const edit = computed(() => {
  return props.id;
});
</script>
<template>
  <div class="md:w-1/2">
    <h2 class="text-[#fdf6fd] text-3xl text-center font-bold">
      Seguimiento de Tarea
    </h2>
    <p class="text-[#fdf6fd] text-lg mt-5 text-center mb-10">
      Añade Tarea y <span class="text-[#AC7DD2] font-bold">Adminístrala</span>
    </p>
    <Alert v-if="alert.message" :alert="alert" />
    <form
      v-on:submit.prevent="validate"
      class="bg-[#393E46] rounded-lg py-10 px5 mb-10"
    >
      <div class="mb-5">
        <div class="ml-3 mr-3">
          <label for="task" class="block text-[#fdf6fd] uppercase font-bold">
            Tarea
          </label>
          <input
            type="text"
            id="task"
            placeholder="Título de la tarea"
            class="border-2 w-full p-2 mt-2 bg-[#C5C5C5] rounded-md placeholder-[#393E46]"
            :value="tittle"
            v-on:input="$emit('update:tittle', $event.target.value)"
          />
        </div>
        <div class="ml-3 mr-3">
          <label for="date" class="block text-[#fdf6fd] uppercase font-bold">
          </label>
          <input
            type="date"
            id="date"
            class="border-2 w-full p-2 mt-2 bg-[#C5C5C5] rounded-md placeholder-[#393E46]"
            v-on:input="$emit('update:date', $event.target.value)"
            :value="date"
          />
        </div>
        <div class="ml-3 mr-3">
          <label for="text" class="block text-[#fdf6fd] uppercase font-bold">
          </label>
          <textarea
            id="text"
            placeholder="Describe la tarea "
            class="border-2 w-full p-2 mt-2 bg-[#C5C5C5] rounded-md placeholder-[#393E46] h-40"
            v-on:input="$emit('update:description', $event.target.value)"
            :value="description"
          />
        </div>
      </div>
      <div class="mr-3 ml-3">
        <input
          type="submit"
          class="text-[#fdf6fd] border-2 border-[#fdf6fd] w-full p-3 font-bold cursor-pointer hover:bg-[#454e59] transition-colors uppercase"
          :value="[edit ? 'Guardar Cambios' : 'Registrar Cita']"
        />
      </div>
    </form>
  </div>
</template>
