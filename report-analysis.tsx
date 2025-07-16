"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Weight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  BarChart3,
  PieChart,
  User,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VitalSign {
  id: string
  name: string
  value: string
  unit: string
  normalRange: string
  status: "normal" | "abnormal" | "neutral"
  trend: "up" | "down" | "stable"
  icon: any
  lastUpdated: string
  memberName: string
}

interface FamilyMember {
  id: string
  name: string
  relationship: string
  age: string
  vitals: VitalSign[]
  riskLevel: "low" | "medium" | "high"
  lastCheckup: string
}

interface Family {
  id: string
  familyName: string
  headOfFamily: string
  members: FamilyMember[]
  overallHealthScore: number
  totalRecords: number
}

interface ReportAnalysisProps {
  onBack: () => void
}

export default function ReportAnalysis({ onBack }: ReportAnalysisProps) {
  const [selectedFamily, setSelectedFamily] = useState("sharma")
  const [selectedMember, setSelectedMember] = useState("all")

  const families: Family[] = [
    {
      id: "sharma",
      familyName: "Sharma Family",
      headOfFamily: "Rajesh Sharma",
      overallHealthScore: 78,
      totalRecords: 15,
      members: [
        {
          id: "rajesh",
          name: "Rajesh Sharma",
          relationship: "Father",
          age: "52",
          riskLevel: "medium",
          lastCheckup: "2 weeks ago",
          vitals: [
            {
              id: "bp-rajesh",
              name: "Blood Pressure",
              value: "142/95",
              unit: "mmHg",
              normalRange: "120/80",
              status: "abnormal",
              trend: "up",
              icon: Heart,
              lastUpdated: "2 hours ago",
              memberName: "Rajesh Sharma",
            },
            {
              id: "sugar-rajesh",
              name: "Blood Sugar",
              value: "110",
              unit: "mg/dL",
              normalRange: "70-100",
              status: "neutral",
              trend: "stable",
              icon: Droplets,
              lastUpdated: "1 day ago",
              memberName: "Rajesh Sharma",
            },
            {
              id: "weight-rajesh",
              name: "Weight",
              value: "78",
              unit: "kg",
              normalRange: "70-80",
              status: "normal",
              trend: "stable",
              icon: Weight,
              lastUpdated: "1 week ago",
              memberName: "Rajesh Sharma",
            },
          ],
        },
        {
          id: "priya",
          name: "Priya Sharma",
          relationship: "Mother",
          age: "48",
          riskLevel: "low",
          lastCheckup: "1 month ago",
          vitals: [
            {
              id: "bp-priya",
              name: "Blood Pressure",
              value: "118/75",
              unit: "mmHg",
              normalRange: "120/80",
              status: "normal",
              trend: "stable",
              icon: Heart,
              lastUpdated: "3 hours ago",
              memberName: "Priya Sharma",
            },
            {
              id: "sugar-priya",
              name: "Blood Sugar",
              value: "92",
              unit: "mg/dL",
              normalRange: "70-100",
              status: "normal",
              trend: "down",
              icon: Droplets,
              lastUpdated: "2 days ago",
              memberName: "Priya Sharma",
            },
            {
              id: "heart-priya",
              name: "Heart Rate",
              value: "72",
              unit: "bpm",
              normalRange: "60-100",
              status: "normal",
              trend: "stable",
              icon: Activity,
              lastUpdated: "3 hours ago",
              memberName: "Priya Sharma",
            },
          ],
        },
      ],
    },
    {
      id: "pandey",
      familyName: "Pandey Family",
      headOfFamily: "Amit Pandey",
      overallHealthScore: 85,
      totalRecords: 8,
      members: [
        {
          id: "amit",
          name: "Amit Pandey",
          relationship: "Father",
          age: "45",
          riskLevel: "low",
          lastCheckup: "3 weeks ago",
          vitals: [
            {
              id: "bp-amit",
              name: "Blood Pressure",
              value: "125/82",
              unit: "mmHg",
              normalRange: "120/80",
              status: "normal",
              trend: "stable",
              icon: Heart,
              lastUpdated: "1 hour ago",
              memberName: "Amit Pandey",
            },
            {
              id: "sugar-amit",
              name: "Blood Sugar",
              value: "95",
              unit: "mg/dL",
              normalRange: "70-100",
              status: "normal",
              trend: "stable",
              icon: Droplets,
              lastUpdated: "12 hours ago",
              memberName: "Amit Pandey",
            },
            {
              id: "temp-amit",
              name: "Body Temperature",
              value: "98.4",
              unit: "°F",
              normalRange: "98.6",
              status: "normal",
              trend: "stable",
              icon: Thermometer,
              lastUpdated: "6 hours ago",
              memberName: "Amit Pandey",
            },
          ],
        },
      ],
    },
  ]

  const currentFamily = families.find((f) => f.id === selectedFamily) || families[0]
  const currentMember = selectedMember === "all" ? null : currentFamily.members.find((m) => m.id === selectedMember)

  const getAllVitals = () => {
    if (currentMember) {
      return currentMember.vitals
    }
    return currentFamily.members.flatMap((member) => member.vitals)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 border-green-200"
      case "abnormal":
        return "bg-red-100 text-red-800 border-red-200"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "abnormal":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "neutral":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-blue-500" />
      case "stable":
        return <div className="w-4 h-0.5 bg-green-500 rounded" />
      default:
        return <div className="w-4 h-0.5 bg-gray-500 rounded" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getFamilyAIInsights = () => {
    if (selectedFamily === "sharma") {
      return [
        {
          type: "warning",
          title: "Hypertension Alert - Rajesh Sharma",
          description:
            "Rajesh's blood pressure (142/95 mmHg) has been consistently elevated over the past month. This requires immediate attention.",
          recommendation: "Schedule cardiology consultation and implement lifestyle modifications immediately.",
          confidence: 94,
          member: "Rajesh Sharma",
        },
        {
          type: "positive",
          title: "Excellent Health Metrics - Priya Sharma",
          description:
            "Priya maintains optimal vital signs across all parameters. Her health indicators show consistent stability.",
          recommendation: "Continue current health routine and schedule annual preventive checkup.",
          confidence: 97,
          member: "Priya Sharma",
        },
        {
          type: "neutral",
          title: "Family Genetic Risk Assessment",
          description:
            "Family history shows predisposition to cardiovascular conditions. Preventive monitoring recommended for all members.",
          recommendation: "Implement family-wide cardiovascular health screening program.",
          confidence: 89,
          member: "All Members",
        },
      ]
    } else {
      return [
        {
          type: "positive",
          title: "Overall Excellent Health - Amit Pandey",
          description:
            "All vital signs within normal ranges. Amit demonstrates excellent health maintenance and lifestyle choices.",
          recommendation: "Continue current health regimen and maintain regular exercise routine.",
          confidence: 96,
          member: "Amit Pandey",
        },
        {
          type: "neutral",
          title: "Preventive Care Recommendation",
          description:
            "Due to age group (45+), increased monitoring for metabolic and cardiovascular health is advisable.",
          recommendation: "Schedule comprehensive health screening every 6 months.",
          confidence: 85,
          member: "Amit Pandey",
        },
      ]
    }
  }

  const vitals = getAllVitals()
  const aiInsights = getFamilyAIInsights()

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header - Fixed back button size */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-[#BBC2E2] text-[#160C28] hover:text-[#F0B67F] hover:bg-[#F0B67F]/10 transition-all duration-200 p-0 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-[#160C28]">Family Health Analysis</h1>
          <p className="text-sm sm:text-base text-[#626868]">AI-powered insights for family's health data</p>
        </div>
      </div>

      {/* Family Selection */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Users className="w-6 h-6" />
            Select Family & Member
          </CardTitle>
          <CardDescription className="text-white/80">Choose which family and member to analyze</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-lg font-semibold text-[#160C28]">Family</label>
              <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {families.map((family) => (
                    <SelectItem key={family.id} value={family.id} className="text-base py-3">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#F0B67F]" />
                        <div>
                          <p className="font-medium">{family.familyName}</p>
                          <p className="text-sm text-[#626868]">
                            {family.members.length} members • {family.totalRecords} records
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-lg font-semibold text-[#160C28]">Family Member</label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all" className="text-base py-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#B6C197]" />
                      <span>All Family Members</span>
                    </div>
                  </SelectItem>
                  {currentFamily.members.map((member) => (
                    <SelectItem key={member.id} value={member.id} className="text-base py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#F0B67F] rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-[#626868]">
                            {member.relationship} • Age {member.age}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Family Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#160C28]">{currentFamily.members.length}</div>
                <p className="text-sm text-[#626868]">Family Members</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#160C28]">{currentFamily.totalRecords}</div>
                <p className="text-sm text-[#626868]">Total Records</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#160C28]">{currentFamily.overallHealthScore}%</div>
                <p className="text-sm text-[#626868]">Health Score</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#160C28]">
                  {vitals.filter((v) => v.status === "abnormal").length}
                </div>
                <p className="text-sm text-[#626868]">Alerts</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* AI Family Health Insights */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#160C28] to-[#626868] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Brain className="w-6 h-6" />
            AI Family Health Insights
          </CardTitle>
          <CardDescription className="text-white/80">
            Personalized analysis for {currentMember ? currentMember.name : currentFamily.familyName}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 ${
                  insight.type === "warning"
                    ? "bg-red-50 border-red-200"
                    : insight.type === "positive"
                      ? "bg-green-50 border-green-200"
                      : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-xl ${
                      insight.type === "warning"
                        ? "bg-red-100"
                        : insight.type === "positive"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                    }`}
                  >
                    {insight.type === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : insight.type === "positive" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-[#160C28] text-lg">{insight.title}</h3>
                      <Badge className="bg-white/80 text-[#626868] border-white/50 text-xs">{insight.member}</Badge>
                    </div>
                    <p className="text-[#626868] mb-3">{insight.description}</p>
                    <div className="bg-white/80 p-3 rounded-xl border border-white/50 mb-3">
                      <p className="text-sm font-medium text-[#160C28]">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#626868]">AI Confidence:</span>
                      <div className="flex-1 max-w-32">
                        <Progress value={insight.confidence} className="h-2 bg-gray-200 rounded-full" />
                      </div>
                      <span className="text-xs font-bold text-[#160C28]">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Family Members Health Overview - Fixed round icons */}
      {selectedMember === "all" && (
        <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#B6C197] to-[#F0B67F] text-white rounded-t-3xl py-6">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <Users className="w-6 h-6" />
              Family Members Overview
            </CardTitle>
            <CardDescription className="text-white/80">Health status of all family members</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-6">
              {currentFamily.members.map((member) => (
                <Card key={member.id} className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">{member.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#160C28]">{member.name}</h3>
                          <p className="text-[#626868]">
                            {member.relationship} • Age {member.age} • Last checkup: {member.lastCheckup}
                          </p>
                        </div>
                      </div>
                      <Badge className={`text-sm ${getRiskColor(member.riskLevel)}`}>
                        {member.riskLevel.charAt(0).toUpperCase() + member.riskLevel.slice(1)} Risk
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {member.vitals.map((vital) => (
                        <div key={vital.id} className="p-4 bg-white rounded-xl border border-[#BBC2E2]/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <vital.icon className="w-4 h-4 text-[#F0B67F]" />
                              <span className="text-sm font-medium text-[#160C28]">{vital.name}</span>
                            </div>
                            {getTrendIcon(vital.trend)}
                          </div>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-lg font-bold text-[#160C28]">{vital.value}</span>
                            <span className="text-xs text-[#626868]">{vital.unit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(vital.status)}
                            <Badge className={`text-xs ${getStatusColor(vital.status)}`}>
                              {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Member Detailed Analysis */}
      {selectedMember !== "all" && currentMember && (
        <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#B6C197] to-[#F0B67F] text-white rounded-t-3xl py-6">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <Activity className="w-6 h-6" />
              {currentMember.name} - Detailed Health Analysis
            </CardTitle>
            <CardDescription className="text-white/80">
              Comprehensive health metrics and trends for {currentMember.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMember.vitals.map((vital) => (
                <Card key={vital.id} className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-full flex items-center justify-center">
                          <vital.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#160C28]">{vital.name}</h3>
                          <p className="text-xs text-[#626868]">{vital.lastUpdated}</p>
                        </div>
                      </div>
                      {getTrendIcon(vital.trend)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#160C28]">{vital.value}</span>
                        <span className="text-sm text-[#626868]">{vital.unit}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusIcon(vital.status)}
                        <Badge className={`text-xs ${getStatusColor(vital.status)}`}>
                          {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="text-xs text-[#626868]">
                        <span className="font-medium">Normal: </span>
                        {vital.normalRange} {vital.unit}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Trends & Analytics - Fixed tabs without sliding */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#626868] to-[#160C28] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <BarChart3 className="w-6 h-6" />
            Family Health Trends & Analytics
          </CardTitle>
          <CardDescription className="text-white/80">
            Visual representation of health data over time for {currentFamily.familyName}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-[#BBC2E2]/20 rounded-2xl p-2 h-auto">
              <TabsTrigger
                value="comparison"
                className="rounded-xl data-[state=active]:bg-[#F0B67F] data-[state=active]:text-white transition-none h-12 text-base font-medium"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Comparison
              </TabsTrigger>
              <TabsTrigger
                value="distribution"
                className="rounded-xl data-[state=active]:bg-[#F0B67F] data-[state=active]:text-white transition-none h-12 text-base font-medium"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Distribution
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-[#160C28]">Family Health Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentFamily.members.map((member) => (
                      <div key={member.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-[#160C28]">{member.name}</span>
                          <Badge className={`text-xs ${getRiskColor(member.riskLevel)}`}>
                            {member.riskLevel.charAt(0).toUpperCase() + member.riskLevel.slice(1)}
                          </Badge>
                        </div>
                        <Progress
                          value={member.riskLevel === "low" ? 90 : member.riskLevel === "medium" ? 60 : 30}
                          className={`h-3 rounded-full ${
                            member.riskLevel === "low"
                              ? "bg-green-100"
                              : member.riskLevel === "medium"
                                ? "bg-yellow-100"
                                : "bg-red-100"
                          }`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-[#160C28]">Health Metrics Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#160C28]">Normal Values</span>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {vitals.filter((v) => v.status === "normal").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#160C28]">Needs Monitoring</span>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          {vitals.filter((v) => v.status === "neutral").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#160C28]">Requires Attention</span>
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          {vitals.filter((v) => v.status === "abnormal").length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-[#160C28]">Family Health Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gradient-to-br from-[#BBC2E2]/20 to-[#B6C197]/20 rounded-2xl flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center space-x-4">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-green-600">
                              {Math.round((vitals.filter((v) => v.status === "normal").length / vitals.length) * 100)}%
                            </span>
                          </div>
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-yellow-600">
                              {Math.round((vitals.filter((v) => v.status === "neutral").length / vitals.length) * 100)}%
                            </span>
                          </div>
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-red-600">
                              {Math.round((vitals.filter((v) => v.status === "abnormal").length / vitals.length) * 100)}
                              %
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-[#626868]">
                              Normal ({vitals.filter((v) => v.status === "normal").length})
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-[#626868]">
                              Monitor ({vitals.filter((v) => v.status === "neutral").length})
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-[#626868]">
                              Attention ({vitals.filter((v) => v.status === "abnormal").length})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-[#160C28]">Recent Health Records</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentFamily.members.slice(0, 3).map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-[#BBC2E2]/20 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#F0B67F] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{member.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-[#160C28]">{member.name}</p>
                            <p className="text-xs text-[#626868]">Last checkup: {member.lastCheckup}</p>
                          </div>
                        </div>
                        <Badge className={`${getRiskColor(member.riskLevel)}`}>
                          {member.riskLevel.charAt(0).toUpperCase() + member.riskLevel.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4">
        <Button className="h-12 sm:h-16 flex items-center justify-center gap-2 sm:gap-3 bg-[#160C28] hover:bg-[#160C28]/80 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-medium text-sm sm:text-base">Share with Doctor</span>
        </Button>
      </div>
    </div>
  )
}
