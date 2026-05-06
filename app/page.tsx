import { AuroraShaders } from "@/components/ui/aurora"
import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-screen items-center justify-center p-6 md:p-10 bg-neutral-950 overflow-hidden">
    <AuroraShaders 
        className="fixed inset-0 h-screen w-screen z-0" 
        speed={0.2} 
        intensity={0.4}
        vibrancy={0.8}
        frequency={1.5}
        stretch={6.0}
      />

      <div className="relative z-10 w-full max-w-sm">
          <LoginForm />
      </div>
    </div>
  )
}
