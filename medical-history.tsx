"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, User, Heart, Activity, Thermometer, Droplets } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicalRecord {
  id: string
  date: string
  type: string
  description: string
  doctor: string
  status: "normal" | "abnormal" | "pending"
  familyMember: string
}

interface MedicalHistoryProps {
  onBack: () => void
}

export default function MedicalHistory({ onBack }: MedicalHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedMember, setSelectedMember] = useState("all")

  const medicalRecords: MedicalRecord[] = [
    {
      id: "1",
      date: "2024-12-15",
      type: "Blood Pressure Check",
      description: "Routine blood pressure monitoring - 142/95 mmHg (elevated)",
      doctor: "Dr. Sharma",
      status: "abnormal",
      familyMember: "Rajesh Sharma",
    },
    {
      id: "2",
      date: "2024-12-10",
      type: "Blood Sugar Test",
      description: "Fasting glucose level - 110 mg/dL (slightly elevated)",
      doctor: "Dr. Patel",
      status: "normal",
      familyMember: "Rajesh Sharma",
    },
    {
      id: "3",
      date: "2024-12-08",
      type: "General Checkup",
      description: "Annual wellness examination - all vitals normal",
      doctor: "Dr. Singh",
      status: "normal",
      familyMember: "Priya Sharma",
    },
    {
      id: "4",
      date: "2024-12-05",
      type: "Heart Rate Monitor",
      description: "Cardiac rhythm assessment - 72 bpm (normal)",
      doctor: "Dr. Kumar",
      status: "normal",
      familyMember: "Priya Sharma",
    },
    {
      id: "5",
      date: "2024-12-01",
      type: "Lab Results",
      description: "Complete blood count and metabolic panel - pending review",
      doctor: "Dr. Gupta",
      status: "pending",
      familyMember: "Amit Pandey",
    },
  ]

  const familyMembers = [
    { id: "all", name: "All Members" },
    { id: "rajesh", name: "Rajesh Sharma" },
    { id: "priya", name: "Priya Sharma" },
    { id: "amit", name: "Amit Pandey" },
  ]

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || record.status === selectedFilter
    const matchesMember = selectedMember === "all" || record.familyMember.toLowerCase().includes(selectedMember)
    return matchesSearch && matchesFilter && matchesMember
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 border-green-200"
      case "abnormal":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    if (type.toLowerCase().includes("blood pressure") || type.toLowerCase().includes("heart")) {
      return <Heart className="w-4 h-4 text-[#F0B67F]" />
    } else if (type.toLowerCase().includes("sugar") || type.toLowerCase().includes("glucose")) {
      return <Droplets className="w-4 h-4 text-[#F0B67F]" />
    } else if (type.toLowerCase().includes("temperature")) {
      return <Thermometer className="w-4 h-4 text-[#F0B67F]" />
    } else {
      return <Activity className="w-4 h-4 text-[#F0B67F]" />
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-[#BBC2E2] text-[#160C28] hover:text-[#F0B67F] hover:bg-[#F0B67F]/10 transition-all duration-200 p-0 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-[#160C28]">Medical History</h1>
          <p className="text-sm sm:text-base text-[#626868]">View and manage family medical records</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Search className="w-6 h-6" />
            Search & Filter Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-8 space-y-4">
          {/* Search Bar - Fixed icon position */}
          <div className="relative">
            <Input
              placeholder="Search medical records, doctors, or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 sm:h-14 text-base sm:text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl pl-4 pr-12"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#BBC2E2] pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#160C28]">Filter by Status</label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="h-12 border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="abnormal">Abnormal</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Family Member Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#160C28]">Filter by Member</label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="h-12 border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {familyMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Records */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#160C28] to-[#626868] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            Medical Records ({filteredRecords.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-full flex items-center justify-center">
                          {getTypeIcon(record.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#160C28] text-base sm:text-lg">{record.type}</h3>
                          <p className="text-sm text-[#626868]">{record.familyMember}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-[#626868]">{record.date}</span>
                      </div>
                    </div>

                    <p className="text-[#626868] mb-3 text-sm sm:text-base">{record.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#F0B67F]" />
                        <span className="text-sm font-medium text-[#160C28]">{record.doctor}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#BBC2E2]/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[#BBC2E2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#160C28] mb-2">No Records Found</h3>
              <p className="text-sm sm:text-base text-[#626868]">
                Try adjusting your search terms or filters to find medical records.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#160C28]">{medicalRecords.length}</div>
            <p className="text-xs sm:text-sm text-[#626868]">Total Records</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200 rounded-2xl bg-green-50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {medicalRecords.filter((r) => r.status === "normal").length}
            </div>
            <p className="text-xs sm:text-sm text-green-600">Normal</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-red-200 rounded-2xl bg-red-50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-red-600">
              {medicalRecords.filter((r) => r.status === "abnormal").length}
            </div>
            <p className="text-xs sm:text-sm text-red-600">Abnormal</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-200 rounded-2xl bg-yellow-50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {medicalRecords.filter((r) => r.status === "pending").length}
            </div>
            <p className="text-xs sm:text-sm text-yellow-600">Pending</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
