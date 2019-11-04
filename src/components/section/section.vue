<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'section',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
