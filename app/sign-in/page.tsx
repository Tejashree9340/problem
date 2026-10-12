import { signIn } from '@/auth';

export default function SignInPage() {
  return <main className="grid min-h-screen place-items-center bg-[#f5eee6] p-6"><div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#ff6b4a]">Problem Coffin</p><h1 className="mt-3 font-display text-4xl font-bold">Enter the yard.</h1><p className="mt-3 text-sm leading-6 text-[#777382]">Use a verified GitHub or Google account.</p><form action={async () => { 'use server'; await signIn('github', { redirectTo: '/journey' }); }}><button className="mt-7 w-full rounded-full bg-[#171622] px-5 py-3 font-bold text-white">Continue with GitHub</button></form><form action={async () => { 'use server'; await signIn('google', { redirectTo: '/journey' }); }}><button className="mt-3 w-full rounded-full border px-5 py-3 font-bold">Continue with Google</button></form></div></main>;
}
