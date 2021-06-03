<template>
  <div id="app">

    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Tickets</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/personal">Personal</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/categorias">Categorías</router-link>
            </li>
          </ul>

        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #4244b9;
}
</style>
