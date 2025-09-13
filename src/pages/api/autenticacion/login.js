import * as z from 'zod';

// Define el esquema de validación para el login
const Usuarioschema = z.object({
  email: z.string().email({ message: 'El correo electrónico no es válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});

export async function POST(context) {
  const { locals, request } = context;
  const pb = locals.pb;

  try {
    const data = await request.json();
    const validation = Usuarioschema.safeParse(data);

    if (!validation.success) {
      const errores = {};
      validation.error.issues.forEach((err) => {
        errores[err.path.join('.')] = err.message;
      });

      return new Response(JSON.stringify({
        status: 'error',
        message: 'Error de validación',
        errors: errores
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { email, password } = validation.data;
    
    // 1. Autentica al usuario con PocketBase
    await pb.collection('users').authWithPassword(email, password);
    
    // 2. Redirige al usuario. Esto le dice al navegador que se mueva
    // a la página de perfil, y Astro se encargará de enviar la cookie de sesión.
    return new Response(null, {
      status: 303, // 303 "See Other" es el código correcto para redirecciones POST
      headers: {
        'Location': '/haiku-reels-astro/'
      },
    });

  } catch (error) {
    if (error.message === 'Failed to authenticate.' || (error.response && error.response.code === 400)) {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Credenciales inválidas. Verifica tu correo electrónico y contraseña.',
        errors: { email: 'Credenciales inválidas' }
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Ocurrió un error inesperado al intentar iniciar sesión.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}