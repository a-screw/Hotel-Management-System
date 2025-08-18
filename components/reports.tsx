"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, Users, Building, DollarSign, Calendar, FileText, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000, expenses: 12000, profit: 33000 },
  { month: "Feb", revenue: 52000, expenses: 15000, profit: 37000 },
  { month: "Mar", revenue: 48000, expenses: 13000, profit: 35000 },
  { month: "Apr", revenue: 61000, expenses: 16000, profit: 45000 },
  { month: "May", revenue: 55000, expenses: 14000, profit: 41000 },
  { month: "Jun", revenue: 67000, expenses: 18000, profit: 49000 },
]

const occupancyTrendData = [
  { month: "Jan", occupancy: 82 },
  { month: "Feb", occupancy: 85 },
  { month: "Mar", occupancy: 78 },
  { month: "Apr", occupancy: 88 },
  { month: "May", occupancy: 85 },
  { month: "Jun", occupancy: 90 },
]

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your PG performance</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,28,000</div>
            <div className="flex items-center space-x-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Avg Occupancy</CardTitle>
            <Building className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="flex items-center space-x-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              <span>+3% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Active Tenants</CardTitle>
            <Users className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">102</div>
            <div className="flex items-center space-x-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              <span>+5 new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Net Profit</CardTitle>
            <BarChart3 className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,40,000</div>
            <div className="flex items-center space-x-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              <span>+18% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
            <CardDescription>Room occupancy percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line type="monotone" dataKey="occupancy" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-lg">Financial Report</CardTitle>
            </div>
            <CardDescription>Detailed revenue, expenses, and profit analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Revenue:</span>
                <span className="font-medium">₹3,28,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Expenses:</span>
                <span className="font-medium">₹88,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Net Profit:</span>
                <span className="font-medium text-green-600">₹2,40,000</span>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-500" />
              <CardTitle className="text-lg">Tenant Report</CardTitle>
            </div>
            <CardDescription>Tenant demographics and occupancy details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Tenants:</span>
                <span className="font-medium">102</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">New This Month:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Occupancy Rate:</span>
                <span className="font-medium text-blue-600">85%</span>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-purple-500" />
              <CardTitle className="text-lg">Property Report</CardTitle>
            </div>
            <CardDescription>Room utilization and maintenance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Rooms:</span>
                <span className="font-medium">120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Occupied:</span>
                <span className="font-medium">102</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Maintenance:</span>
                <span className="font-medium text-orange-600">3</span>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
