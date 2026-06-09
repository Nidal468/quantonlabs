"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Loader2, Chrome } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof signinSchema>;

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setAuthError("");

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.error) {
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-slate-200 shadow-sm rounded-xl">
        <CardHeader className="space-y-1 text-center pb-2">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <img src="/images/assets/seo/ql_logo.png" alt="Logo" className="w-8 h-8" />
            <img src="/images/assets/seo/ql_text.png" alt="Company Name" className="w-28 h-auto" />
          </Link>
          <CardTitle className="text-xl font-semibold text-slate-900">Welcome back</CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Sign in to continue to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-2">
          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full h-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            aria-label="Sign in with Google"
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
              or
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="space-y-1.5">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                      id="email"
                      {...field}
                      type="email"
                      placeholder="Email address"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="pl-9 h-10 bg-white border-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-shadow"
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600 font-medium" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="space-y-1.5">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                      id="password"
                      {...field}
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className="pl-9 h-10 bg-white border-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-shadow"
                    />
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-xs text-red-600 font-medium" role="alert">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />

            {authError && (
              <p className="text-sm text-red-600 text-center font-medium" role="alert" aria-live="polite">
                {authError}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-slate-500 pt-2">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-slate-900 font-medium hover:underline underline-offset-2">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
