<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { uid } from "uid";
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import Task from "./components/Task.vue";

const tasks = ref([]);

const task = reactive({
  id: null,
  tittle: "",
  date: "",
  description: "",
});

watch(
  tasks,
  () => {
    saveLocalStorage();
  },
  {
    deep: true,
  }
);

const saveLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

onMounted(() => {
  const tasksStorage = localStorage.getItem("tasks");
  if (tasksStorage) {
    tasks.value = JSON.parse(tasksStorage);
  }
});

const saveTask = () => {
  if (task.id) {
    const i = tasks.value.findIndex((taskState) => taskState.id === task.id);
    tasks.value[i] = { ...task };
  } else {
    tasks.value.push({ ...task, id: uid() });
  }

  task.tittle = "";
  task.date = "";
  task.description = "";
  task.id = null;
};

const updateTask = (id) => {
  const editTask = tasks.value.filter((task) => task.id === id)[0];
  Object.assign(task, editTask);
};
const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header />

    <div class="mt-12 md:flex gap-3">
      <Form
        v-model:tittle="task.tittle"
        v-model:date="task.date"
        v-model:description="task.description"
        @save-task="saveTask"
        :id="task.id"
      />
      <div class="md:w-1/2 md:h-screen overflow-y-auto">
        <h3 class="text-[#fdf6fd] text-3xl text-center font-black">
          Administra tus Tareas
        </h3>
        <div v-if="tasks.length > 0">
          <p class="text-[#fdf6fd] text-lg mt-5 text-center mb-10">
            Información de <span class="text-[#AC7DD2] font-bold">Tareas</span>
          </p>
          <Task
            v-for="task in tasks"
            :task="task"
            @update-task="updateTask"
            @delete-task="deleteTask"
          />
        </div>
        <p v-else class="text-[#fdf6fd] text-lg mt-5 text-center mb-10">
          No tienes <span class="text-[#AC7DD2] font-bold">Tareas</span>
        </p>
      </div>
    </div>
  </div>
</template>
