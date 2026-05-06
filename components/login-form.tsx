"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [mode, setMode] = useState<"login" | "signup">("login")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
    )

     const router = useRouter()

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            alert(error.message)
        } else {
            router.refresh()
            router.push("/dashboard")
          }
        } else {
          if (password !== confirmPassword) {
              return alert("Passwords do not match")
            }
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
          return alert(error.message)
        }

          alert("Signup successful! Please check your email to confirm your account.")
          setMode("login")
        }
     }

     const inputStyle = cn(
    "bg-white/5 dark:bg-black/20 border-white/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500",
    "transition-colors duration-5000 ease-in-out autofill:bg-transparent",
    "autofill:[-webkit-text-fill-color:rgb(240,240,240)] dark:autofill:[-webkit-text-fill-color:white]",
    "autofill:[transition:background-color_5000s_ease-in-out_0s]"
  )
    
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white/10 dark:bg-zinc-950/20 backdrop-blur-md border-white/10 dark:border-white/5 shadow-2xl">
        <CardHeader>
          <CardTitle>
            {mode === "login" ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your email and password to login"
              : "Enter your information below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyle}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                />
              </Field>
              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputStyle}
                  />
                </Field>
              )}
              
              <Field>
                <Button type="submit">
                  {mode === "login" ? "Login" : "Sign up"}
                </Button>
                <FieldDescription className="text-center">
                  {mode === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button type="button" onClick={() => setMode("signup")} className="underline text-zinc-100 font-medium">
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button type="button" onClick={() => setMode("login")} className="underline text-zinc-100 font-medium">
                        Login
                      </button>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
