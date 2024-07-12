export const AuthLayout = ({children}: {children: React.ReactNode}) => (
  <div className="flex min-h-screen w-screen items-center justify-center bg-slate-200 p-4">
    <div className="border border-zinc-300 bg-white max-w-96 w-full rounded px-6 py-4 mb-6">
      {children}
    </div>
  </div>
)
