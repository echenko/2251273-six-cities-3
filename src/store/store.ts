// Import Configure Store ( Создание конфигурации хранилища )
import { configureStore } from '@reduxjs/toolkit';
// Import Reducer ( Импорт редьюсера )
import { reducer } from './reducer';

// Create Store
export const store = configureStore({
  reducer,
});
