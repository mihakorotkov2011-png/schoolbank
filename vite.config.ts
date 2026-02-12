import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Загружаем переменные из .env файла
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      // Это критически важно для GitHub Pages! 
      // Путь должен совпадать с названием твоего репозитория
      base: '/schoolbank/', 

      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      
      plugins: [react()],
      
      // Прокидываем API ключи в код приложения
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      resolve: {
        alias: {
          // Настройка алиаса @ для удобного импорта
          '@': path.resolve(__dirname, './'),
        }
      },
      
      build: {
        // Увеличиваем лимиты для сборки больших файлов, если вдруг база вырастет
        chunkSizeWarningLimit: 1600,
      }
    };
});