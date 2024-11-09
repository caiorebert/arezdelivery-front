// middleware.ts
import { authMiddleware } from './lib/middlewares/authMiddleware';
import { combineMiddlewares } from './lib/middlewares/combineMiddleware';
import { loggedMiddleware } from './lib/middlewares/loggedMiddleware';


export function middleware (req:any) {
  if (req.url.includes('/dashboard')) {
    return authMiddleware(req);
  }

  if (req.url.includes('/login')) {
    return loggedMiddleware(req);
  }

}

export const config = {
  matcher: ['/dashboard/:path']
}