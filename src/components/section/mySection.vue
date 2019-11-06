<template>
  <section class="section">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'MySection',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .section {
    padding: 0 10px;
    margin-top: 20px;
    box-shadow: 0 0 4px #fff;
  }
</style>
