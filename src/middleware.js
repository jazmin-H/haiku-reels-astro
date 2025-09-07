import PocketBase from 'pocketbase';
import { defineMiddleware } from 'astro/middleware';

const pocketbaseUrl = "http://127.0.0.1:8090/";

export const onRequest = defineMiddleware(async (context, next) => {
  const pb = new PocketBase(pocketbaseUrl);
  //await pb.admins.authWithPassword('email', 'password');
  // Carga el token de autenticación desde la cookie
  pb.authStore.loadFromCookie(context.request.headers.get('cookie') || '');

  // Asigna el cliente de PocketBase a Astro.locals
  // Esto lo hace accesible en cualquier endpoint o componente de Astro
  context.locals.pb = pb;

  try {
    // Si la sesión es válida, la "refresca"
    pb.authStore.isValid && await pb.collection('users').authRefresh();
  } catch (_) {
    // Si el token es inválido o ha expirado, lo limpia
    pb.authStore.clear();
  }

  // Se encarga de la siguiente solicitud
  const response = await next();

  // Envía el token actualizado como una cookie en la respuesta
  response.headers.set('set-cookie', pb.authStore.exportToCookie());

  return response;
});