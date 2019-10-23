<template>
  <nav class="navbar navbar-expand bg-dark navbar-dark sticky-top">
    <router-link to="/" class="navbar-brand">TGIF</router-link>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Congress 113</a>
        <ul class="dropdown-menu bg-dark">
          <li class="dropdown-item">
            <router-link to="/senate" class="nav-link">Senate</router-link>
          </li>
          <li class="dropdown-item">
            <router-link to="/house" class="nav-link">House</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Attendance</a>
        <ul class="dropdown-menu bg-dark">
          <li class="dropdown-item">
            <router-link to="/senate_attendance" class="nav-link">Senate</router-link>
          </li>
          <li class="dropdown-item">
            <router-link to="/house_attendance" class="nav-link">House</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Party Loyalty</a>
        <ul class="dropdown-menu bg-dark">
          <li class="dropdown-item">
            <router-link to="/senate_loyalty" class="nav-link">Senate</router-link>
          </li>
          <li class="dropdown-item">
            <router-link to="/house_loyalty" class="nav-link">House</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link to="/legislators" class="nav-link">Legislators</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "the-nav"
};
</script>
