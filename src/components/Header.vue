<template>
  <nav class="bigface-navbar">
    <div class="navbar-container">

      <!-- Hamburger Icon (for mobile only) -->
      <button class="hamburger" @click="toggleMenu" aria-label="Toggle navigation">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </button>

      <!-- Navigation Links -->
      <ul :class="['nav-list', { open: isOpen }]">
        <li class="nav-item" v-for="link in navLinks" :key="link.name">
          <router-link
            :to="link.path"
            class="nav-link-custom"
            active-class="active"
            @click="isOpen = false"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false,
      navLinks: [
        { name: "Home", path: "/" },
        { name: "Dev", path: "/dev" },
        { name: "UX", path: "/ux" },
        { name: "Design", path: "/design" },
        { name: "Photo", path: "/photography" },
        { name: "Video", path: "/videography" },
        { name: "About", path: "/about" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.bigface-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  justify-content: center; /* Center by default */
  align-items: center;
  position: relative;
}

/* Hamburger Icon */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: black;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Nav List */
.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link-custom {
  color: #000;
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
  color: #000;
}

.nav-link-custom::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease;
}

.nav-link-custom:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: #000;
}

/* === Responsive Styles === */
@media (max-width: 768px) {
  .navbar-container {
    justify-content: center;
  }

  .hamburger {
    display: flex;
  }

  .nav-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    pointer-events: none;
    opacity: 0;
  }

  .nav-list.open {
    transform: translateY(0);
    pointer-events: auto;
    opacity: 1;
  }
}
</style>