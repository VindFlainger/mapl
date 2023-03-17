<template>
  <div class="app-overlay">

  </div>
</template>

<script>
export default {
  name: "AppOverlay"
}
</script>

<style scoped>
.app-overlay{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  background: rgba(37, 36, 36, 0.19);
}
</style>