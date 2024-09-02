<!-- BreddsView OK -->
<script setup>
import { onMounted } from "vue";
import { useDogBreedsStore } from "@/stores/dogBreedsStore";

// Inicializamos el store de razas de perros
const dogs = useDogBreedsStore();

// Usamos el lifecycle hook onMounted para obtener los datos de las razas de perros cuando el componente se monta
onMounted(async () => {
  await dogs.fetchDogBreedsData();
});
</script>

<template>
  <!-- Contenedor principal para las tarjetas de perros -->
  <div class="container">
    <!-- Recorremos los datos de las razas de perros y creamos una tarjeta para cada una -->
    <div class="card-container" v-for="dog in dogs.dogBreedsData" :key="dog.id">
      
      <div class="card">
        <!-- Contenedor para la imagen y el ícono -->
        <div class="image-container">
          <img :src="dog.image.url" :alt="dog.name" class="dog-image">
          <div class="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
              />
            </svg>
            <!-- <div class="icon-text">Más información</div> -->
          </div>
        </div>

        <!-- Información del perro -->
        <div class="info">
          <h2>{{ dog.name }}</h2>
          <p><span>Origen:</span> {{ dog.origin }}</p>
          <p><span>Destinado a:</span> {{ dog.bred_for }}</p>
          <p><span>Temperamento:</span> {{ dog.temperament }}</p>
          <p><span>Altura:</span> {{ dog.height.metric }} cm</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para el contenedor principal */
.container {
  display: flex;
  flex-wrap: wrap;
  
}

/* Estilos para el contenedor de cada tarjeta */
.card-container {
  width: 25rem;
  height: 38rem;
  perspective: 1000px;
  margin: 3rem auto;
}

/* Estilos para la tarjeta */
.card {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.3s ease;
}

/* Estilos para el contenedor de la imagen y el ícono */
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Estilos para el contenedor del ícono y el texto */
.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.3); /* Fondo semitransparente */
  padding: 5px;
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.5s;
  z-index: 1;
}

/* Estilos para el ícono */
.icon {
  color: white;
  width: 38px; /* Ajusta el tamaño según sea necesario */
  height: 38px; /* Ajusta el tamaño según sea necesario */
}

/* Estilos para el texto debajo del ícono */
.icon-text {
  color: white;
  margin-top: 5px;
  font-size: 14px;
}

/* Estilos para la imagen del perro */
.dog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: height 0.5s;
}

/* Estilos para la información del perro */
.info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s;
  z-index: 2;

}

/* Estilos para el hover de la tarjeta */
.card:hover{
  transform: scale(1.05);
  transition: transform 500ms ease-in;
}

.card:hover .dog-image {
  height: 50%;

}

.card:hover .info {
  opacity: 1;
}

.card:hover .icon-container {
  opacity: 0;
}

/* Estilos para los encabezados en la información del perro */
.info h2 {
  margin: 0;
}

/* Estilos para los párrafos en la información del perro */
.info p span {
  margin: 5px 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent-200);
}
</style>
