<template>
  <section>
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
