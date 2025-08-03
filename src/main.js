import { createApp } from 'vue'
import App from './App.vue'
import bridge from '@vkontakte/vk-bridge'

console.log('Скрипт main.js выполнен') // Добавьте эту строку

const app = createApp(App)

bridge.send('VKWebAppInit', {})
  .then(() => {
    console.log('VK Bridge инициализирован')
    app.mount('#app')
  })
  .catch(error => {
    console.error('Ошибка VK Bridge:', error)
    app.mount('#app') // Все равно монтируем приложение
  })