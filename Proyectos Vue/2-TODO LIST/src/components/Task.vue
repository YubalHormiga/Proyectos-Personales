<script setup>
const props = defineProps({
  task: {
    type: Object,
    requiered: true,
  },
});
defineEmits(["update-task", "delete-task"]);
</script>
<template>
  <div class="mx-5 my-10 bg-[#393E46] px-5 py-10 rounded-xl">
    <p class="font-bold mb-3 text-[#fdf6fd] uppercase">
      Tarea:
      <span class="font-normal normal-case">
        {{ task.tittle }}
      </span>
    </p>

    <p class="font-bold mb-3 text-[#fdf6fd] uppercase">
      Fecha Cita:
      <span class="font-normal normal-case">
        {{ task.date }}
      </span>
    </p>

    <p class="font-bold mb-3 text-[#fdf6fd] uppercase">
      Descripción:
      <span class="font-normal normal-case">
        {{ task.description }}
      </span>
    </p>

    <div class="grid md:grid-cols-2 gap-5 mt-10">
      <button
        type="button"
        class="block w-full py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-[#fdf6fd] font-bold uppercase rounded-lg transition-colors"
        v-on:click="$emit('update-task', task.id)"
      >
        Editar
      </button>

      <button
        type="button"
        class="block w-full py-2 px-10 bg-[#D90429] hover:bg-red-700 text-[#fdf6fd] font-bold uppercase rounded-lg transition-colors"
        v-on:click="$emit('delete-task', task.id)"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>
