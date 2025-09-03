<template>
    <footer class="footer">
      <div class="footer-content">
        <h1>Raghul Attur Sukumar</h1>
        <h3>Melbourne → Earth</h3>
        <p>&copy; {{ new Date().getFullYear() }} All rights reserved.</p>
        <div class="footer-links">
          <a href="https://www.instagram.com/raghul.sukumar/" target="_blank">Instagram</a>
          <a href="https://linkedin.com/in/raghul-sukumar" target="_blank">LinkedIn</a>
          <a href="https://www.youtube.com/@raghul24296" target="_blank">YouTube</a>
          <a href="https://github.com/raghul-attur" target="_blank">GitHub</a>
          <a href="mailto:raghul.attursukumar@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .footer {
    width: 100%;
    padding: 2rem 1rem;
    background-color: #000000;
    border-top: 1px solid #ddd;
    text-align: center;
    font-size: 0.9rem;
    color: #ffffff;
    margin-top: 4rem;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-links {
    margin-top: 0.5rem;
  }
  
  .footer-links a {
    margin: 0 1rem;
    color: #ffffff;
    text-decoration: none;
  }
  
  html, body, #app {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app > *:first-child {
  flex: 1;
}
  </style>