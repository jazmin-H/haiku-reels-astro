import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from "axios";

// 1. Define el esquema de validación con Zod
const schema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  
});

export default function LoginForm() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // 2. Inicializa react-hook-form con el esquema de Zod
  const { register, handleSubmit,setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // 3. Define la función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    // Aquí es donde enviarías los datos a tu backend.
    try {
      
      const response = await axios.post(
        "http://localhost:4321/haiku-reels-astro/api/autenticacion/login",
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      if (response.data.status=="success"){
         //redurect en caso de registro exitoso
          window.location.href='http://localhost:4321/haiku-reels-astro';

      }
      /*setError('username', {
        type: 'manual',
        message: 'Este nombre de usuario ya está en uso. ¡Prueba otro!',
      }, { shouldFocus: true }); // Opcional: enfocar el campo*/
    } catch (error) {
      console.log(error.response.data);
      for (let key in error.response.data.errors){
         setError(key , {
        type: 'manual',
        message: error.response.data.errors[key],
      }, { shouldFocus: true }); // Opcional: enfocar el campo */
      console.log(key);
      }
     
      
    }
    
    // Por ahora, solo mostraremos una alerta de éxito.
    console.log('Datos del formulario:', data);
    setSubmissionStatus('success');
  };

  return (
    <div className="p-8 rounded-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center -800">Iniciar Sesion</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       
        

        {/* Campo de Correo Electrónico */}
        <div className="mb-4">
          <label className="block -700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 -700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 -700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            id="password"
            type="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

       

        {/* Botón de Enviar */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"          >
            IniciarSesion
          </button>
        </div>
      </form>
      {submissionStatus === 'success' && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Inicio de Sesion exitoso!</span>
        </div>
      )}
    </div>
  );
}