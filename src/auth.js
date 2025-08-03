import bridge from '@vkontakte/vk-bridge';
import { auth } from './firebase';
import { signInWithCustomToken } from 'firebase/auth';

export const vkAuth = async () => {
  try {
    // 1. Получаем данные пользователя VK
    const vkUser = await bridge.send('VKWebAppGetUserInfo');
    
    // 2. Создаем кастомный токен для Firebase
    const token = await createFirebaseToken(vkUser.id);
    
    // 3. Авторизуем в Firebase
    await signInWithCustomToken(auth, token);
    
    // 4. Создаем/обновляем запись пользователя
    await createUserProfile(vkUser);
    
    return vkUser;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
};

const createFirebaseToken = async (vkId) => {
  // В реальном приложении здесь будет вызов вашего бэкенда
  // Для демо используем простую генерацию
  return btoa(`vk:${vkId}:${Date.now()}`);
};

const createUserProfile = async (vkUser) => {
  const userDoc = {
    id: vkUser.id,
    name: `${vkUser.first_name} ${vkUser.last_name}`,
    phone: vkUser.phone || '',
    balance: 300, // Начальный баланс
    status: 'Карта 5%',
    createdAt: new Date()
  };
  
  await setDoc(doc(db, 'users', vkUser.id), userDoc);
};