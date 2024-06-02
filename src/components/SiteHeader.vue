<template>
  <header class="site-header">
    <div class="logo-container">
      <img
        alt="Order calculator logo"
        class="logo"
        src="../assets/logo.svg"
        width="32"
        height="32"
      />
      <h1>Order calculator</h1>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: var(--z-index-max);
  max-height: 82px;
  width: 100%;
  padding: 0 20px;
  background-color: var(--color-background-mute);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
</style>
