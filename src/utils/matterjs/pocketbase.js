// src/utils/matterjs/pocketbase.js
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Manejo de sesión en el lado del cliente
if (typeof window !== 'undefined') {
  const storedAuth = localStorage.getItem('pb_auth');
  if (storedAuth) {
    pb.authStore.loadFromCookie(storedAuth);
  }

  pb.authStore.onChange(() => {
    localStorage.setItem('pb_auth', pb.authStore.exportToCookie());
  });
}

export default pb;
