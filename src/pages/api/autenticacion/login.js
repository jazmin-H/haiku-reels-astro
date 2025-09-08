import * as z from 'zod';
import bcrypt from 'bcrypt';

// 1. Define el esquema de validación con Zod
const Usuarioschema = z.object({
  email: z.string().email({ message: 'El correo electrónico no es válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});

// 2. Define la función que maneja las solicitudes POST
export async function POST(context) {
    
  const { locals, request } = context;
  const pb = locals.pb; // Accedemos a la instancia de PocketBase desde el middleware

  try {
    // 3. Obtiene los datos del cuerpo de la solicitud
    const data = await request.json();
    console.log(data);
    // 4. Valida los datos con Zod
    const validation = Usuarioschema.safeParse(data);
    
    

    // Si la validación falla, devuelve los errores en formato JSON
    if (!validation.success) {
      const erroresArray = validation.error.issues.map((err) => ({
    [err.path.join  ('.')]: err.message,

  }));

const errores = {}

erroresArray.forEach((error) => {
    errores[Object.keys(error)[0]] = Object.values(error)[0];
});
   
  console.log(validation.error.issues);
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Error de validación',
        errors: errores
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { username, email, password } = validation.data;

    //console.log(pb);

 
    // 5. Verifica si el usuario o email ya existen en PocketBase
    /*const existingEmail = await pb.collection('users').getFirstListItem(`email="${data.email}"`).catch(() => null);;
    console.log(existingEmail);

    if (!existingEmail) {
      return new Response(JSON.stringify({
        status: 'error',
        errors: {email:'no se encontro usuario'},
        message: 'error de validacion.',
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    */
    // 8. Inicia sesión automáticamente y establece la sesión
    console.log(email,password);
    const authData = await pb.collection('users').authWithPassword(email, password);
    locals.pb.authStore.save(authData.token, authData.record);

    await context.session?.set('user', authData.record);
    
    // 9. Devuelve una respuesta de éxito con los datos del usuario
    return new Response(JSON.stringify({
      status: 'success',
      message: 'Usuario registrado exitosamente.',
      user: authData.record,
    }), {
      status: 201, // 201 Created
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    //console.error('Error en el registro:', error);
    if (error.response) {
    console.log('Errores de validación:');
    console.log(error.response);  // Aquí están los errores por campo

    return new Response(JSON.stringify({
      status: 'error',
      errors:{
        email:"Este email esta en uso"
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } else {
    console.error('Error desconocido:', error);
  } 

    return new Response(JSON.stringify({
      status: 'error',
      message: 'Ocurrió un error inesperado.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}