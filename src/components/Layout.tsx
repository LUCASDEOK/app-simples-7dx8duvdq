import { Outlet } from 'react-router-dom'
import { UserCircle2 } from 'lucide-react'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center h-14 md:h-16 px-4 md:px-6 bg-background shadow-sm">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center relative">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            My Tasks
          </h1>
          <div className="absolute right-0">
            <UserCircle2 className="h-8 w-8 text-slate-400" />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full pt-20 md:pt-24 pb-14 md:pb-16">
        <Outlet />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center h-10 bg-background border-t border-border">
        <p className="text-sm text-slate-400">© 2024 My Tasks App</p>
      </footer>
    </div>
  )
}
