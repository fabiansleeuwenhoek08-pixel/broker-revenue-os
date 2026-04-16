import { type NextRequest, NextResponse } from 'next/server'

/**
 * Authentication middleware — currently a pass-through.
 *
 * TODO: Wire up Supabase Auth (or another provider) to protect routes.
 * Example with @supabase/ssr:
 *
 *   import { createServerClient } from '@supabase/ssr'
 *
 *   const supabase = createServerClient(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 *     { cookies: { getAll: () => request.cookies.getAll(), ... } }
 *   )
 *   const { data: { user } } = await supabase.auth.getUser()
 *   if (!user) return NextResponse.redirect(new URL('/login', request.url))
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image  (image optimisation)
     * - favicon.ico, public assets
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
