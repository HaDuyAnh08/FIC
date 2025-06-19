import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    // port: 5174, // Đổi port thành 5174
    open: true, // Mở trình duyệt tự động
  },
  plugins: [react()],
});