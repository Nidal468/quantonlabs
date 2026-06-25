"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";

const baseFields = {
    username: z
        .string()
        .min(2, "User name must be at least 2 characters long")
        .max(50, "First name is too long"),

    email: z
        .string()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password is too long"),

    avatar: z.any().optional(),

    country: z
        .string()
        .refine((val) => val && val.trim() !== "", {
            message: "Please select your country",
        }),

    currency: z
        .string()
        .refine((val) => val && val.trim() !== "", {
            message: "Please select your currency",
        }),
};

export const signupSchema = z.discriminatedUnion("mode", [
    z.object({
        mode: z.literal("create"),

        ...baseFields,

        companyName: z
            .string()
            .refine((val) => val && val.trim() !== "", {
                message: "Please enter your company name",
            })
            .min(2, "Company name must be at least 2 characters long")
            .max(100, "Company name is too long"),
    }),

    z.object({
        mode: z.literal("invite"),

        ...baseFields,

        inviteCode: z
            .string()
            .refine((val) => val && val.trim() !== "", {
                message: "Please enter your invite code",
            })
            .min(6, "Please enter a valid invite code")
            .max(100, "Invite code is too long"),
    }),
]);

type FormData = z.infer<typeof signupSchema>;

const currencyMap: Record<string, string> = {
    US: "USD",
    UK: "GBP",
    EU: "EUR",
    CA: "CAD",
    AU: "AUD",
    BD: "BDT",
    IN: "INR",
};

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"create" | "invite">("create");
    const [preview, setPreview] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            mode: "create",
            username: "",
            email: "",
            password: "",
            companyName: "",
            country: "US",
            currency: "USD"
        },
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        const formData = new FormData;
        formData.append("file", data.avatar);
        formData.append("username", data.username);
        formData.append("country", data.country);
        formData.append("currency", data.currency);
        formData.append("email", data.email);
        formData.append("password", data.password);

        if (data.mode === "create") {
            formData.append("companyName", data.companyName);
        }

        if (data.mode === "invite") {
            formData.append("inviteCode", data.inviteCode)
        }


        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: formData,
            cache: 'no-store'
        });

        setLoading(false);

        if (res.ok) {
            await signIn("credentials", { email: data.email, password: data.password })
        }
    };

    const switchMode = (newMode: "create" | "invite") => {
        setMode(newMode);
        setValue("mode", newMode);
    };

    const handleCountryChange = (value: string, onChange: any) => {
        onChange(value);
        setValue("currency", currencyMap[value] || "");
    };

    console.log(preview)

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl">
                <CardContent className="p-8 flex flex-col gap-6">

                    {/* ✅ Logo added */}
                    <Link href="/" className="flex items-center gap-2 justify-center">
                        <img src="/images/assets/seo/ql_logo.png" className="w-8" />
                        <img src="/images/assets/seo/ql_text.png" className="w-28" />
                    </Link>

                    <h1 className="text-2xl font-semibold text-center">
                        Create account
                    </h1>

                    {/* Tabs */}
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button
                            onClick={() => switchMode("create")}
                            className={`flex-1 py-2 rounded-md text-sm ${mode === "create"
                                ? "bg-white shadow text-black"
                                : "text-slate-500"
                                }`}
                        >
                            Create Company
                        </button>
                        <button
                            onClick={() => switchMode("invite")}
                            className={`flex-1 py-2 rounded-md text-sm ${mode === "invite"
                                ? "bg-white shadow text-black"
                                : "text-slate-500"
                                }`}
                        >
                            Join via Invite
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        {/* Avatar */}

                        <Controller
                            name="avatar"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col items-center gap-3 relative">

                                    {/* Clickable Avatar */}
                                    <label className="cursor-pointer flex flex-col items-center gap-2">

                                        <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden hover:bg-slate-200 transition">

                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-8 h-8 text-slate-400" />
                                            )}

                                        </div>

                                        <span className="text-xs text-slate-500">
                                            {preview ? "Change avatar" : "Click to upload avatar"}
                                        </span>
                                    </label>

                                    {/* Hidden Input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute opacity-0 bg-red-500 top-09 w-full h-20"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(file);

                                            if (file) {
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />

                                </div>
                            )}
                        />

                        {/* First Name */}
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Input placeholder="Username" {...field} />
                                    {errors.username && (
                                        <p className="text-xs text-red-500">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Input placeholder="Email" type="email" {...field} />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <Input placeholder="Password" type="password" {...field} />
                                    {errors.password && (
                                        <p className="text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Country */}
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <select
                                        value={field.value || ""}
                                        onChange={(e) =>
                                            handleCountryChange(e.target.value, field.onChange)
                                        }
                                        className="w-full border rounded-md p-2 text-sm"
                                    >
                                        <option value="">Select Country</option>

                                        <optgroup label="Top Countries">
                                            <option value="US">🇺🇸 United States</option>
                                            <option value="UK">🇬🇧 United Kingdom</option>
                                            <option value="EU">🇪🇺 Europe</option>
                                            <option value="CA">🇨🇦 Canada</option>
                                            <option value="AU">🇦🇺 Australia</option>
                                        </optgroup>

                                        <optgroup label="Other">
                                            <option value="BD">🇧🇩 Bangladesh</option>
                                            <option value="IN">🇮🇳 India</option>
                                        </optgroup>
                                    </select>

                                    {errors.country && (
                                        <p className="text-xs text-red-500">
                                            {errors.country.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Currency */}
                        <Controller
                            name="currency"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <select {...field} className="w-full border rounded-md p-2 text-sm">
                                        <option value="">Select Currency</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="CAD">CAD ($)</option>
                                        <option value="AUD">AUD ($)</option>
                                        <option value="BDT">BDT (৳)</option>
                                        <option value="INR">INR (₹)</option>
                                    </select>

                                    {errors.currency && (
                                        <p className="text-xs text-red-500">
                                            {errors.currency.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Conditional */}
                        {mode === "create" ? (
                            <Controller
                                name="companyName"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Input placeholder="Company Name" {...field} />
                                        {"companyName" in errors && errors.companyName && (
                                            <p className="text-xs text-red-500">
                                                {errors.companyName.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        ) : (
                            <Controller
                                name="inviteCode"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Input placeholder="Invite Code / Link" {...field} />
                                        {"inviteCode" in errors && errors.inviteCode && (
                                            <p className="text-xs text-red-500">
                                                {errors.inviteCode.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        )}

                        <Button disabled={loading}>
                            {loading ? "Creating..." : "Continue"}
                        </Button>

                    </form>

                    <p className="text-xs text-center text-slate-500">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="underline">
                            Sign in
                        </Link>
                    </p>

                </CardContent>
            </Card>
        </div>
    );
}