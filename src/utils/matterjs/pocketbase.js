// src/utils/pocketbase.js
import PocketBase from 'pocketbase';

// URL local de PocketBase
const pb = new PocketBase('http://127.0.0.1:8090');

// Guarda sesión en localStorage (ya lo maneja PocketBase)
export default pb;
