<template>
    <nav class="bigface-navbar sticky-top">
      <ul class="nav-list d-flex justify-content-center gap-5 m-0 p-3">
        <li class="nav-item" v-for="link in navLinks" :key="link.name">
          <router-link :to="link.path" class="nav-link-custom" active-class="active">{{ link.name }}</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    data() {
      return {
        navLinks: [
          { name: "Home", path: "/" },
          { name: "Dev", path: "/dev" },
          { name: "UX", path: "/ux" },
          { name: "Design", path: "/design" },
          { name: "Photo", path: "/photography" },
          { name: "Video", path: "/videography" },
          { name: "About", path: "/about" }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
.bigface-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  color: #000000;
  z-index: 1000;
  padding: 0; /* remove default push */
}

.nav-list {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 1rem 0;
}
  
  .nav-link-custom {
    color: #000000;
    font-family: 'Arial', sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    position: relative;
    text-decoration: none;
    padding: 6px 0;
    transition: color 0.2s ease-in-out;
  }
  
  .nav-link-custom:hover {
    color: #000000;
  }
  
  .nav-link-custom::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: rgb(0, 0, 0);
    transition: width 0.3s ease;
  }
  
  .nav-link-custom:hover::after,
  .router-link-active::after {
    width: 100%;
  }
  
  .router-link-active {
    color: #fff;
  }
  </style>