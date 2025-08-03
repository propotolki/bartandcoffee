import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const initCoffeeShops = async () => {
  const shops = [
    {
      name: "Центральный",
      address: "г. Нижний Новгород, ул. Советская площадь, д. 5",
      workingHours: "Пн-Пт: 8:00-22:00, Сб-Вс: 9:00-23:00",
      coordinates: [56.326887, 44.007417]
    },
    {
      name: "Набережный",
      address: "г. Нижний Новгород, ул. Рождественская, д. 12",
      workingHours: "Ежедневно: 9:00-23:00",
      coordinates: [56.328142, 44.012568]
    }
  ];

  for (const shop of shops) {
    await addDoc(collection(db, 'coffeeShops'), shop);
  }
  console.log("Coffee shops initialized!");
};

export const initUsers = async () => {
  const users = [
    {
      id: "vk12345",
      name: "Александр Коннов",
      phone: "+7(906)349-31-52",
      balance: 300,
      status: "Карта 5%",
      qrCode: "9280799-610111"
    }
  ];

  for (const user of users) {
    await addDoc(collection(db, 'users'), user);
  }
  console.log("Users initialized!");
};

// Вызов в main.js после инициализации приложения
// import { initCoffeeShops, initUsers } from './services/db-init';
// initCoffeeShops();
// initUsers();