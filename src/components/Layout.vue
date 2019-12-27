<template>
  <div class="layout">
    <RouterView />
  </div>

</template>

<script>
export default {
  name: 'Layout',
  inject: ['size']
}
</script>

<style lang="scss">
  .layout {
    height: 100vh;
  }
</style>
