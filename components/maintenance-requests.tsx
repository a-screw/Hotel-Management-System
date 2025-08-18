"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Search,
  Filter,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  Settings,
  Edit,
} from "lucide-react"

interface MaintenanceRequest {
  id: string
  tenantName: string
  tenantAvatar?: string
  roomNumber: string
  title: string
  description: string
  category: "plumbing" | "electrical" | "ac" | "furniture" | "cleaning" | "other"
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "completed" | "cancelled"
  createdDate: string
  assignedTo?: string
  completedDate?: string
  estimatedCost?: number
  actualCost?: number
  notes?: string
}

const initialRequests: MaintenanceRequest[] = [
  {
    id: "1",
    tenantName: "John Doe",
    tenantAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    roomNumber: "101",
    title: "AC not cooling properly",
    description:
      "The air conditioner in my room is not cooling properly. It seems to be running but the air is not cold.",
    category: "ac",
    priority: "high",
    status: "in-progress",
    createdDate: "2024-01-15",
    assignedTo: "Raj Kumar",
    estimatedCost: 2000,
  },
  {
    id: "2",
    tenantName: "Sarah Wilson",
    tenantAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    roomNumber: "205",
    title: "Leaking faucet",
    description: "The bathroom faucet is leaking continuously. Water is dripping all the time.",
    category: "plumbing",
    priority: "medium",
    status: "pending",
    createdDate: "2024-01-16",
    estimatedCost: 500,
  },
  {
    id: "3",
    tenantName: "Mike Johnson",
    tenantAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    roomNumber: "102",
    title: "Broken chair",
    description: "The study chair in my room is broken. One of the legs is loose.",
    category: "furniture",
    priority: "low",
    status: "completed",
    createdDate: "2024-01-10",
    assignedTo: "Suresh",
    completedDate: "2024-01-14",
    actualCost: 800,
  },
  {
    id: "4",
    tenantName: "Emily Chen",
    tenantAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    roomNumber: "203",
    title: "Electrical outlet not working",
    description: "The power outlet near my desk is not working. Need urgent repair for my laptop charging.",
    category: "electrical",
    priority: "urgent",
    status: "pending",
    createdDate: "2024-01-18",
    estimatedCost: 300,
  },
]

export function MaintenanceRequests() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<MaintenanceRequest | null>(null)
  const { toast } = useToast()

  const [newRequest, setNewRequest] = useState<Partial<MaintenanceRequest>>({
    tenantName: "",
    tenantAvatar: "",
    roomNumber: "",
    title: "",
    description: "",
    category: "other",
    priority: "medium",
    status: "pending",
    createdDate: new Date().toISOString().split("T")[0],
    estimatedCost: 0,
  })

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.roomNumber.includes(searchTerm) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesPriority = filterPriority === "all" || request.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleOpenAddDialog = () => {
    setEditingRequest(null)
    setNewRequest({
      tenantName: "",
      tenantAvatar: "",
      roomNumber: "",
      title: "",
      description: "",
      category: "other",
      priority: "medium",
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      estimatedCost: 0,
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (request: MaintenanceRequest) => {
    setEditingRequest(request)
    setNewRequest(request)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingRequest(null)
    setNewRequest({
      tenantName: "",
      tenantAvatar: "",
      roomNumber: "",
      title: "",
      description: "",
      category: "other",
      priority: "medium",
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
      estimatedCost: 0,
    })
  }

  const handleSubmit = () => {
    if (!newRequest.tenantName || !newRequest.roomNumber || !newRequest.title || !newRequest.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (editingRequest) {
      // Update existing request
      const updatedRequests = requests.map((request) =>
        request.id === editingRequest.id ? { ...request, ...newRequest } : request,
      )
      setRequests(updatedRequests)
      toast({
        title: "Success",
        description: `Maintenance request has been updated successfully`,
      })
    } else {
      // Add new request
      const request: MaintenanceRequest = {
        id: Date.now().toString(),
        tenantName: newRequest.tenantName!,
        tenantAvatar:
          newRequest.tenantAvatar ||
          `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face&auto=format`,
        roomNumber: newRequest.roomNumber!,
        title: newRequest.title!,
        description: newRequest.description!,
        category: newRequest.category as any,
        priority: newRequest.priority as any,
        status: newRequest.status as any,
        createdDate: newRequest.createdDate!,
        estimatedCost: Number(newRequest.estimatedCost) || 0,
      }
      setRequests([...requests, request])
      toast({
        title: "Success",
        description: `Maintenance request for ${request.tenantName} has been created successfully`,
      })
    }

    handleCloseDialog()
  }

  const handleUpdateStatus = (requestId: string, newStatus: string) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId
        ? {
            ...request,
            status: newStatus as any,
            completedDate: newStatus === "completed" ? new Date().toISOString().split("T")[0] : undefined,
          }
        : request,
    )
    setRequests(updatedRequests)

    const request = requests.find((r) => r.id === requestId)
    toast({
      title: "Success",
      description: `Request status updated to ${newStatus}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "in-progress":
        return <Settings className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-gray-600 mt-1">Manage and track maintenance requests from tenants</p>
        </div>
        <Button
          onClick={handleOpenAddDialog}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Request
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRequest ? "Edit Maintenance Request" : "Create Maintenance Request"}</DialogTitle>
            <DialogDescription>
              {editingRequest ? "Update maintenance request details" : "Add a new maintenance request for a tenant"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tenantName">Tenant Name *</Label>
              <Input
                id="tenantName"
                value={newRequest.tenantName}
                onChange={(e) => setNewRequest({ ...newRequest, tenantName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number *</Label>
              <Input
                id="roomNumber"
                value={newRequest.roomNumber}
                onChange={(e) => setNewRequest({ ...newRequest, roomNumber: e.target.value })}
                placeholder="101"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="tenantAvatar">Tenant Avatar URL</Label>
              <Input
                id="tenantAvatar"
                value={newRequest.tenantAvatar}
                onChange={(e) => setNewRequest({ ...newRequest, tenantAvatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                placeholder="Brief description of the issue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newRequest.category}
                onValueChange={(value) => setNewRequest({ ...newRequest, category: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="ac">Air Conditioning</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newRequest.priority}
                onValueChange={(value) => setNewRequest({ ...newRequest, priority: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Cost</Label>
              <Input
                id="estimatedCost"
                type="number"
                value={newRequest.estimatedCost || ""}
                onChange={(e) => setNewRequest({ ...newRequest, estimatedCost: Number(e.target.value) || 0 })}
                placeholder="1000"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                placeholder="Detailed description of the issue..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingRequest ? "Update Request" : "Create Request"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pending</CardTitle>
            <Clock className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "pending").length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">In Progress</CardTitle>
            <Settings className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "in-progress").length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "completed").length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.priority === "urgent").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </div>
                    </Badge>
                    <Badge className={getPriorityColor(request.priority)}>
                      <span className="capitalize">{request.priority}</span>
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {request.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-gray-100">
                  <AvatarImage src={request.tenantAvatar || "/placeholder.svg"} alt={request.tenantName} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                    {request.tenantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{request.tenantName}</p>
                  <p className="text-xs text-gray-500">Room {request.roomNumber}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-700">{request.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created: {new Date(request.createdDate).toLocaleDateString()}</span>
                </div>
                {request.estimatedCost && (
                  <div>
                    <span>Est. Cost: ₹{request.estimatedCost.toLocaleString()}</span>
                  </div>
                )}
                {request.assignedTo && (
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>Assigned: {request.assignedTo}</span>
                  </div>
                )}
                {request.completedDate && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Completed: {new Date(request.completedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                {request.status === "pending" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateStatus(request.id, "in-progress")}
                    className="flex-1"
                  >
                    Start Work
                  </Button>
                )}
                {request.status === "in-progress" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateStatus(request.id, "completed")}
                    className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    Mark Complete
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => handleOpenEditDialog(request)} className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all" || filterPriority !== "all"
              ? "Try adjusting your search or filter criteria."
              : "All maintenance requests will appear here."}
          </p>
        </div>
      )}
    </div>
  )
}
