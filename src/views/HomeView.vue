<template>
  <div class="home-view">
    <!-- Заголовок баланса -->
    <div class="balance-header">
      <h2>БАЛАНС</h2>
      <div class="balance-value">{{ balance }}</div>
    </div>

    <!-- Статус карты -->
    <div class="status-card">
      <h3>СТАТУС</h3>
      <p>{{ status }}</p>
    </div>

    <!-- Категории -->
    <div class="categories">
      <button class="category-btn">МЕНЮ</button>
      <button class="category-btn">АКЦИИ И НОВОСТИ</button>
    </div>

    <!-- Навигация -->
    <div class="navigation">
      <button class="nav-btn active">ГЛАВНАЯ</button>
      <button class="nav-btn">МЕНЮ</button>
      <button class="nav-btn">АДРЕСА</button>
      <button class="nav-btn">ПРОФИЛЬ</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { vkAuth } from '../auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const user = ref(null);
const balance = ref(0);
const status = ref('');

onMounted(async () => {
  user.value = await vkAuth();
  if (user.value) {
    const userDoc = await getDoc(doc(db, 'users', user.value.id.toString()));
    if (userDoc.exists()) {
      balance.value = userDoc.data().balance;
      status.value = userDoc.data().status;
    }
  }
});
</script>

<style scoped>
.home-view {
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.balance-header {
  text-align: center;
  margin-bottom: 20px;
}

.balance-header h2 {
  font-size: 18px;
  color: #555;
}

.balance-value {
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
}

.status-card {
  background: #f0f8ff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.status-card h3 {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
}

.status-card p {
  font-size: 16px;
  font-weight: 500;
}

.categories {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.category-btn {
  width: 48%;
  padding: 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  border-top: 1px solid #eee;
}

.nav-btn {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
}

.nav-btn.active {
  color: #3498db;
  font-weight: bold;
}
</style>