// middlewares/combineMiddlewares.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

//@ts-ignore
export function combineMiddlewares(...middlewares) {
  return (request: NextRequest) => {
    for (const middleware of middlewares) {
      const result = middleware(request);
      if (result instanceof NextResponse) {
        return result;
      }
    }
    return NextResponse.next();
  };
}
