import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import pb from '../utils/matterjs/pocketbase.js';

// 1. Define el esquema de validación con Zod
const schema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido.')
    .email('Email invalido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),

});

export default function LoginForm() {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data) => {
    try {
      const authData = await pb.collection('users').authWithPassword(
        data.email,
        data.password
      );

      console.log("🔓 Sesión iniciada:", authData);
      alert(`Bienvenido ${authData.record.username}`);
      window.location.href = "/haiku-reels-astro/";

    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      setError("email", { type: "manual", message: "Credenciales inválidas" });
    }
  };

  return (
    <div className="p-8 rounded-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesion</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
              }`}
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
              }`}
            id="password"
            type="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit">
            IniciarSesion
          </button>
        </div>
      </form>
    </div>
  );
}