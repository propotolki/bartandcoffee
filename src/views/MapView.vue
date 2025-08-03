<template>
  <div class="map-view">
    <h1>Наши адреса</h1>
    
    <div class="location-card" v-for="shop in coffeeShops" :key="shop.id">
      <h3>{{ shop.name }}</h3>
      <p>{{ shop.address }}</p>
      <p>{{ shop.workingHours }}</p>
      <button @click="openMap(shop.coordinates)">Показать на карте</button>
    </div>
    
    <div v-if="showMap" class="map-container">
      <img :src="mapUrl" alt="Карта" class="map-image">
      <button @click="closeMap">Закрыть карту</button>
    </div>
    
    <div class="navigation">
      <!-- ... -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const coffeeShops = ref([]);
const showMap = ref(false);
const currentCoordinates = ref(null);

// Загрузка кофеен из Firestore
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'coffeeShops'));
  coffeeShops.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
});

const openMap = (coords) => {
  currentCoordinates.value = coords;
  showMap.value = true;
};

const closeMap = () => {
  showMap.value = false;
};

const mapUrl = computed(() => {
  if (!currentCoordinates.value) return '';
  const [lat, lon] = currentCoordinates.value;
  return `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=16&l=map&pt=${lon},${lat},pm2dol`;
});
</script>

<style scoped>
.map-image {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin-top: 10px;
}

.map-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  padding: 20px;
}
</style>