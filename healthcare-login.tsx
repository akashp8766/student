"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, School, Stethoscope, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BBC2E2]/30 via-white to-[#B6C197]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header with Logo */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-2xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-[#160C28]">MedStudent Portal</h1>
            <div className="flex items-center justify-center space-x-2 text-[#B6C197] bg-[#B6C197]/20 px-4 py-2 rounded-full border border-[#B6C197]/30">
              <Lock className="w-4 h-4" />
              <p className="text-sm font-medium">Your information is secure and confidential</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm border border-[#BBC2E2]/30">
          <CardHeader className="space-y-2 pb-8">
            <CardTitle className="text-2xl font-bold text-center text-[#160C28]">Welcome Back</CardTitle>
            <CardDescription className="text-center text-[#626868] text-base">
              Sign in to access your healthcare education dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form className="space-y-6">
              {/* College Name */}
              <div className="space-y-3">
                <Label htmlFor="college" className="text-base font-semibold text-[#160C28]">
                  College Name
                </Label>
                <div className="relative">
                  <School className="absolute left-4 top-4 h-5 w-5 text-[#626868]" />
                  <Input
                    id="college"
                    name="college"
                    type="text"
                    placeholder="Enter your medical college name"
                    className="pl-12 h-14 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-2 focus:ring-[#F0B67F]/20 rounded-lg transition-all duration-200 bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
                    required
                    aria-describedby="college-help"
                  />
                </div>
                <p id="college-help" className="text-sm text-[#626868] sr-only">
                  Enter the full name of your medical college or institution
                </p>
              </div>

              {/* Roll Number */}
              <div className="space-y-3">
                <Label htmlFor="rollNumber" className="text-base font-semibold text-[#160C28]">
                  Roll Number
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-[#626868]" />
                  <Input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    placeholder="Enter your student roll number"
                    className="pl-12 h-14 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-2 focus:ring-[#F0B67F]/20 rounded-lg transition-all duration-200 bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
                    required
                    aria-describedby="roll-help"
                  />
                </div>
                <p id="roll-help" className="text-sm text-[#626868] sr-only">
                  Enter your unique student identification number
                </p>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-semibold text-[#160C28]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-[#626868]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-14 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-2 focus:ring-[#F0B67F]/20 rounded-lg transition-all duration-200 bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
                    required
                    aria-describedby="password-help"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-4 h-6 w-6 text-[#626868] hover:text-[#F0B67F] focus:outline-none focus:ring-2 focus:ring-[#F0B67F]/30 focus:ring-offset-2 rounded"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p id="password-help" className="text-sm text-[#626868] sr-only">
                  Enter your secure password to access your account
                </p>

                {/* Forgot Password Link */}
                <div className="text-left">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-[#F0B67F] hover:text-[#F0B67F]/80 hover:underline focus:outline-none focus:ring-2 focus:ring-[#F0B67F]/30 focus:ring-offset-2 rounded transition-colors duration-200"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/30"
              >
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-[#160C28]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#B6C197] rounded-full"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#F0B67F] rounded-full"></div>
              <span>256-bit Encryption</span>
            </div>
          </div>
          <p className="text-xs text-[#626868] max-w-md mx-auto bg-white/80 p-4 rounded-2xl border border-[#BBC2E2]/30 backdrop-blur-sm">
            This portal is designed specifically for healthcare students. All data is encrypted and stored securely in
            compliance with healthcare privacy standards.
          </p>
        </div>
      </div>
    </div>
  )
}
