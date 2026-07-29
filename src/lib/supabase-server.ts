import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

let hasLoggedMissingSupabaseConfig = false;

/**
 * Creates a Supabase client for use in Server Components, Route Handlers, and
 * Server Actions. Reads the user's session from cookies so that RLS policies
 * can be applied correctly.
 *
 * Returns `null` when the required environment variables are not set so that
 * callers can handle the unconfigured case gracefully (e.g., redirect to login).
 */
export async function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Gracefully handle missing Environment Variables
  if (!supabaseUrl || !supabaseAnonKey) {
    if (!hasLoggedMissingSupabaseConfig) {
      console.error(
        '⚠️ Supabase Environment Variables Missing: Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local or Vercel dashboard.'
      );
      hasLoggedMissingSupabaseConfig = true;
    }
    return null;
  }

  // 2. Await cookies() for Next.js 15 compatibility
  const cookieStore = await cookies();

  // 3. Return the authenticated server client
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Components cannot set cookies — only Route Handlers /
          // Server Actions can. Silently ignore so reads still work.
        }
      },
    },
  });
}
