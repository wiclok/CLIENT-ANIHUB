function getCookie(cookieHeader, name) {
  return cookieHeader?.split('; ').find(c => c.startsWith(name + '='))?.split('=')[1];
}

export const onRequest = async ({ request }, next) => {
  const token = getCookie(request.headers.get('cookie'), 'auth_token');
  const url = new URL(request.url);

  if (!token && url.pathname.startsWith("/perfil")) {
    // Construye URL absoluta para la redirección
    const redirectUrl = new URL("/Registro", request.url);
    return Response.redirect(redirectUrl.toString(), 302);
  }

  return next();
};