<template>
  <div id="app">
    <Adaptive>
      <Layout />
    </Adaptive>
    <CustomCursor />
  </div>
</template>

<script>

import CustomCursor from './components/CustomCursor'
import Adaptive from '@/components/Adaptive'
import Layout from '@/components/Layout'
export default {
  components: { Layout, Adaptive, CustomCursor }
}
</script>

<style lang="scss">
  #app {
    cursor: none;
    position: relative;
    background-color: #1A191B;
  }

</style>
