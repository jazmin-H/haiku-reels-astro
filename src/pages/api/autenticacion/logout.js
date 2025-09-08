

export const GET = async ({ request,locals, redirect }) => {
    // Inicializa el cliente de PocketBase
    const pb = locals.pb; 
    // Limpia la cookie de autenticación.
    // Aunque el cliente se encarga de esto, es una buena práctica
    // asegurarse de que no haya una cookie residual.
    
    pb.authStore.clear();

    // Redirige al usuario a la página principal
    return redirect('/haiku-reels-astro', 302);
};
