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
    <div className="min-h-screen bg-gradient-to-br from-[#BBC2E2]/30 via-white to-[#B6C197]/20 flex flex-col">
      {/* Mobile App Header */}
      <div className="bg-white text-[#160C28] px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">MedStudent</h1>
            <p className="text-[#626868] text-lg">Healthcare Portal</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardHeader className="text-center py-8">
            <CardTitle className="text-2xl font-bold text-[#160C28]">Welcome Back</CardTitle>
            <CardDescription className="text-[#626868] text-base">Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            <form className="space-y-6">
              {/* College Name */}
              <div className="space-y-3">
                <Label htmlFor="college" className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <School className="w-5 h-5 text-[#F0B67F]" />
                  College Name
                </Label>
                <Input
                  id="college"
                  name="college"
                  type="text"
                  placeholder="Enter your medical college"
                  className="h-16 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Roll Number */}
              <div className="space-y-3">
                <Label htmlFor="rollNumber" className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#F0B67F]" />
                  Roll Number
                </Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  className="h-16 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#F0B67F]" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-16 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 pr-16 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-[#626868] hover:text-[#F0B67F] focus:outline-none focus:ring-2 focus:ring-[#F0B67F]/30 rounded-xl"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-base font-medium text-[#F0B67F] hover:text-[#F0B67F]/80 focus:outline-none focus:ring-2 focus:ring-[#F0B67F]/30 rounded-lg px-2 py-1"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-16 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl transform active:scale-95"
              >
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Info */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#BBC2E2]/30">
            <div className="flex items-center justify-center space-x-6 text-sm text-[#160C28] mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#B6C197] rounded-full animate-pulse"></div>
                <span className="font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#F0B67F] rounded-full animate-pulse"></div>
                <span className="font-medium">Secure Access</span>
              </div>
            </div>
            <p className="text-xs text-[#626868]">
              Your data is encrypted and protected according to healthcare privacy standards
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
