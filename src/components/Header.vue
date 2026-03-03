<template>
  <nav class="bigface-navbar">
    <div class="navbar-container">

      <!-- Hamburger (mobile only) -->
      <button class="hamburger" @click="toggleMenu" aria-label="Toggle navigation">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </button>

      <!-- Nav links -->
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
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      navLinks: [
        { name: 'Home',   path: '/'            },
        { name: 'UX',     path: '/ux'          },
        { name: 'Design', path: '/design'      },
        { name: 'Videos', path: '/videography' },
        { name: 'Dev',    path: '/dev'         },
        { name: 'About',  path: '/About'       },
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
  /* Must sit above the particle canvas (z-index 0) and floating tags (z-index 2) */
  z-index: 1000;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Nav list — always visible on desktop */
.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: list-item;
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
  display: inline-block;
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
.nav-link-custom.active::after {
  width: 100%;
}

/* Hamburger — hidden on desktop */
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

.hamburger span.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger span.open:nth-child(2) { opacity: 0; }
.hamburger span.open:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

/* Mobile */
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
    transform: translateY(-110%);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    pointer-events: none;
    opacity: 0;
    z-index: 999;
  }

  .nav-list.open {
    transform: translateY(0);
    pointer-events: auto;
    opacity: 1;
  }
}
</style>