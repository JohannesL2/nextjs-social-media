import { AuroraShaders } from "@/components/ui/aurora"
import { LoginForm } from "@/components/login-form"
import SmokeyCursor from "@/components/lightswind/smokey-cursor"

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-screen items-center justify-center p-6 md:p-10 bg-neutral-950 overflow-hidden">
      <SmokeyCursor
        splatRadius={0.1}
        splatForce={3000}
        densityDissipation={8}
        velocityDissipation={5}
        colorUpdateSpeed={5}
        className="z-1"
      />
    <AuroraShaders 
        className="fixed inset-0 h-screen w-screen z-1" 
        speed={0.2} 
        intensity={0.4}
        vibrancy={0.8}
        frequency={1.5}
        stretch={6.0}
      />

      <div className="relative z-9999 w-full max-w-sm">
          <LoginForm />
      </div>
    </div>
  )
}
