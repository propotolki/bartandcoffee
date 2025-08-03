<template>
  <div>
    <h1 style="color: white;">Vue приложение работает!</h1>
    <p>Этот текст должен быть виден на красном фоне</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Компонент App смонтирован')
  }
}
</script>