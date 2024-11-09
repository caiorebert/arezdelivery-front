// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function authMiddleware(request: NextRequest) {
    // Obtem o token de autenticação dos cookies
    const token = request.cookies.get('token');

    console.log(request.url);
    // Se não houver token, redireciona para a página de login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Permite que a requisição prossiga
    return NextResponse.next();
}
