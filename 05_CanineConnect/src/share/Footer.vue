<script setup></script>

<template>
  <footer class="footer-container">
    <div>
      <p class="footer-text">Copyright &copy; 2024 Yubal Hormiga</p>
    </div>
    <div class="footer-links">
      <div class="links">
        <a href="contact.html">Contact</a>
      </div>
      <div>
        <a href="privacy-policy.html">Privacy Policy</a>
      </div>
    </div >
    
  </footer>
</template>
<style scoped>
  .footer-container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) { 
  .footer-container {
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
}
}
.footer-text{
  margin:0;
}
.footer-links {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

.footer-links a {
  text-decoration: none;
  color: white;
}
</style>
