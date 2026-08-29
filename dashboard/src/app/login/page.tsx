import { Suspense } from 'react'
import LoginForm from './login-form'

export default function LoginPage() {
  return (
    <main className="flex h-full items-center justify-center overflow-y-auto bg-navy-950 px-6 py-12">
      <div className="w-full max-w-md rounded-xl border border-accent-500/30 bg-navy-900 p-8 shadow-2xl">
        <img src="/mark.svg" alt="" className="h-14 w-auto" />
        <h1 className="mt-6 font-display text-3xl font-black uppercase tracking-tight text-white">
          Astra Nova <span className="text-accent-500">Admin</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to manage quotes and enquiries.</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
