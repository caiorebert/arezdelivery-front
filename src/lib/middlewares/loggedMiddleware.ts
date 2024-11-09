// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function loggedMiddleware(request: NextRequest) {

    // Obtem o token de autenticação dos cookies
    const token = localStorage.getItem('token');

    // Se não houver token, redireciona para a página de login
    if (token) {
        // return NextResponse.next();
        
        return NextResponse.redirect(new URL('/algo', request.url));
    }

    //Permite que a requisição prossiga
    return NextResponse.next();
}

export const config = {
    matcher: ['/login/:path']
};