"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Users, CreditCard, AlertTriangle, DollarSign } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 12000 },
  { month: "Feb", revenue: 52000, expenses: 15000 },
  { month: "Mar", revenue: 48000, expenses: 13000 },
  { month: "Apr", revenue: 61000, expenses: 16000 },
  { month: "May", revenue: 55000, expenses: 14000 },
  { month: "Jun", revenue: 67000, expenses: 18000 },
]

const occupancyData = [
  { name: "Occupied", value: 85, color: "#3b82f6" },
  { name: "Vacant", value: 15, color: "#e5e7eb" },
]

const recentActivities = [
  {
    id: 1,
    type: "payment",
    message: "Payment received from John Doe - Room 101",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    type: "maintenance",
    message: "Maintenance request for Room 205 - AC repair",
    time: "4 hours ago",
    status: "pending",
  },
  {
    id: 3,
    type: "tenant",
    message: "New tenant Sarah Wilson checked in - Room 303",
    time: "1 day ago",
    status: "info",
  },
  {
    id: 4,
    type: "payment",
    message: "Payment overdue for Room 102 - Mike Johnson",
    time: "2 days ago",
    status: "warning",
  },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your PG.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Rooms</CardTitle>
            <Building className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs opacity-90">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Occupied Rooms</CardTitle>
            <Users className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">102</div>
            <p className="text-xs opacity-90">85% occupancy rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹67,000</div>
            <p className="text-xs opacity-90">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pending Payments</CardTitle>
            <AlertTriangle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs opacity-90">₹24,000 total due</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Occupancy</CardTitle>
            <CardDescription>Current occupancy distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Occupied (85%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Vacant (15%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your PG management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : activity.status === "pending"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Users className="mr-2 h-4 w-4" />
              Add New Tenant
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Building className="mr-2 h-4 w-4" />
              Add New Room
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Create Maintenance Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
