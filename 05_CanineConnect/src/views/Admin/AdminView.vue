<script setup>
    import { ref, computed, watchEffect } from "vue";
    import { useFirestore, useCollection } from "vuefire";
    import { collection, query, doc, updateDoc } from "firebase/firestore";

    // Inicializa Firestore
    const db = useFirestore();

    // Crea una consulta para la colección "users"
    const usersQuery = query(collection(db, "users"));

    // Usa la consulta para obtener la colección
    const { data: usersCollection, error } = useCollection(usersQuery);

    // Almacena los datos en una variable reactiva
    const users = ref([]);
    const searchTerm = ref("");

    // Función para actualizar el estado de administrador
    const toggleAdminStatus = async (user) => {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          isAdmin: !user.isAdmin,
        });
        // Actualiza el estado local después de la actualización
        user.isAdmin = !user.isAdmin;
      } catch (e) {
        console.error("Error updating admin status:", e);
      }
    };

    // Filtrar usuarios según el término de búsqueda
    const filteredUsers = computed(() => {
      if (!searchTerm.value) {
        return users.value;
      }
      return users.value.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          user.displayName.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    watchEffect(() => {
      if (usersCollection.value) {
        users.value = usersCollection.value;
      }
      if (error.value) {
        console.error("Error fetching users:", error.value);
      }
    });
  </script>

<template>
<div class="admin-container">
    <h1 class="admin-title">Panel de Administración</h1>
    <p>Introduce usuario para asignar o quitar permisos de administrador.</p>
    <input
      v-model="searchTerm"
      placeholder="Buscar por correo o nombre"
      type="text"
      class="admin-search"
    />
    <div v-for="user in filteredUsers" :key="user.uid" class="admin-user-card">
      <div class="user-data">
        <p class="user-name">Nombre: {{ user.displayName }}</p>
        <p class="user-email">Email: {{ user.email }}</p>
      </div>
      <div>
        <button
          @click="toggleAdminStatus(user)"
          class="admin-toggle-button"
          :style="{ backgroundColor: user.isAdmin ? 'red' : 'blue' }"
        >
          {{ user.isAdmin ? "Quitar" : "Poner" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  padding: 1rem;
  max-width: 60rem;
  margin: auto;
}

.admin-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.admin-search {
  margin: 1rem 0;
  min-width: 30rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.admin-user-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgb(218, 212, 209);
  max-width: 50rem;
  padding: 0.5rem 0;
}

@media (min-width: 640px) {
  .admin-user-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.user-data {
  min-width: 40rem;
}

.user-name,
.user-email {
  font-size: 1rem;
  margin: 0;
}

.admin-toggle-button {
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>