import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import pb from '../utils/matterjs/pocketbase.js'; // ✅ usamos PocketBase directamente, no axios

// 1. Esquema de validación con Zod
const schema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres.'),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos y condiciones.' }),
  }),
});

export default function RegisterForm() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // 2. Inicializa react-hook-form con zod
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // 3. Registro del usuario con PocketBase (modo cliente)
  const onSubmit = async (data) => {
    try {
      // ✅ Crear el usuario directamente con PocketBase SDK
      const record = await pb.collection('users').create({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.password,
      });

      console.log("✅ Registro exitoso:", record);
      setSubmissionStatus('success');

      // Opcional: iniciar sesión automáticamente
      await pb.collection('users').authWithPassword(data.email, data.password);

      // Redirigir después de registrar
      window.location.href = 'http://localhost:4321/haiku-reels-astro';
    } catch (error) {
      console.error("❌ Error en registro:", error);

      // Manejo de errores de PocketBase
      if (error?.data?.data) {
        for (let key in error.data.data) {
          setError(key, {
            type: "manual",
            message: error.data.data[key].message,
          });
        }
      } else {
        setError("email", {
          type: "manual",
          message: "Error desconocido al registrar el usuario.",
        });
      }
    }
  };

  return (
    <div className="p-8 rounded-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center -800">Crea tu cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo de Nombre de Usuario */}
        <div className="mb-4">
          <label className="block -700 text-sm font-bold mb-2" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 -700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''
              }`}
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            {...register('username')}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

        {/* Campo de Correo Electrónico */}
        <div className="mb-4">
          <label className="block -700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 -700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
              }`}
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-4">
          <label className="block -700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 -700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
              }`}
            id="password"
            type="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Términos y Condiciones */}
        <div className="mb-6">
          <label className="flex items-center -700 text-sm">
            <input
              type="checkbox"
              className="mr-2 leading-tight"
              {...register('terms')}
            />
            Acepto los <a href="#" className="text-blue-500 hover:text-blue-700 ml-1">Términos y Condiciones</a>
          </label>
          {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
        </div>

        {/* Botón de Enviar */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
      {submissionStatus === 'success' && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">¡Registro exitoso!</span>
        </div>
      )}
    </div>
  );
}