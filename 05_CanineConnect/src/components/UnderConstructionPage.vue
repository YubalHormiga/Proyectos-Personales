<!-- componente UnderContructionPage -->
<template>
    <div class="container">
      <div class="construction-icon">🚧</div>
      <div>
        <h1>Estamos trabajando en ello</h1>
      </div>

      <div>
        <p>¡Volveremos pronto con algo increíble!</p>
      </div>
    </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem;
  font-family: Arial, sans-serif;
  background-color: #f3f3f3;
  color: #333;
  text-align: center;
}
h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
}
p {
  font-size: 1.2em;
}
.construction-icon {
  font-size: 5em;
  margin-bottom: 0.5em;
}
</style>
