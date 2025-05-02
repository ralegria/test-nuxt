<template>
  <div class="app-container">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 class="logo">
            <NuxtLink to="/">Dragon Ball App</NuxtLink>
          </h1>
          <nav class="main-nav">
            <ul>
              <li><NuxtLink to="/">Characters</NuxtLink></li>
              <li>
                <NuxtLink to="/planets/register">Register Planet</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main class="main-content">
      <div class="container">
        <NuxtPage />
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Dragon Ball App</p>
      </div>
    </footer>
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: var(--text-color);
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
}

.main-nav ul {
  display: flex;
  list-style: none;
}

.main-nav li {
  margin-left: 20px;
}

.main-nav a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.main-nav a:hover {
  opacity: 0.8;
}

.main-content {
  flex: 1;
  padding: 30px 0;
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .main-nav {
    margin-top: 15px;
  }

  .main-nav ul {
    justify-content: center;
  }
}
</style>
