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
import { Plus, Search, Filter, Edit, Trash2, Phone, Mail, Calendar, User } from "lucide-react"

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  roomNumber: string
  checkInDate: string
  rent: number
  deposit: number
  status: "active" | "inactive" | "pending"
  emergencyContact: string
  address: string
  occupation: string
  idProof: string
  avatar?: string
}

const initialTenants: Tenant[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    roomNumber: "101",
    checkInDate: "2024-01-15",
    rent: 8000,
    deposit: 16000,
    status: "active",
    emergencyContact: "+91 9876543211",
    address: "123 Main St, City",
    occupation: "Software Engineer",
    idProof: "Aadhar Card",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+91 9876543212",
    roomNumber: "205",
    checkInDate: "2024-02-01",
    rent: 9000,
    deposit: 18000,
    status: "active",
    emergencyContact: "+91 9876543213",
    address: "456 Oak Ave, City",
    occupation: "Marketing Manager",
    idProof: "Passport",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+91 9876543214",
    roomNumber: "102",
    checkInDate: "2024-01-20",
    rent: 8000,
    deposit: 16000,
    status: "pending",
    emergencyContact: "+91 9876543215",
    address: "789 Pine St, City",
    occupation: "Teacher",
    idProof: "Driving License",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+91 9876543216",
    roomNumber: "203",
    checkInDate: "2024-01-25",
    rent: 8500,
    deposit: 17000,
    status: "active",
    emergencyContact: "+91 9876543217",
    address: "321 Elm St, City",
    occupation: "Graphic Designer",
    idProof: "Passport",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    id: "5",
    name: "David Rodriguez",
    email: "david.rodriguez@email.com",
    phone: "+91 9876543218",
    roomNumber: "301",
    checkInDate: "2024-02-05",
    rent: 9500,
    deposit: 19000,
    status: "active",
    emergencyContact: "+91 9876543219",
    address: "654 Maple Ave, City",
    occupation: "Data Analyst",
    idProof: "Driving License",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
  },
  {
    id: "6",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+91 9876543220",
    roomNumber: "204",
    checkInDate: "2024-01-30",
    rent: 8200,
    deposit: 16400,
    status: "inactive",
    emergencyContact: "+91 9876543221",
    address: "987 Oak St, City",
    occupation: "Nurse",
    idProof: "Aadhar Card",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
  },
]

export function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const { toast } = useToast()

  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    name: "",
    email: "",
    phone: "",
    roomNumber: "",
    checkInDate: "",
    rent: 0,
    deposit: 0,
    status: "active",
    emergencyContact: "",
    address: "",
    occupation: "",
    idProof: "",
    avatar: "",
  })

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.roomNumber.includes(searchTerm)
    const matchesFilter = filterStatus === "all" || tenant.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleOpenAddDialog = () => {
    setEditingTenant(null)
    setNewTenant({
      name: "",
      email: "",
      phone: "",
      roomNumber: "",
      checkInDate: "",
      rent: 0,
      deposit: 0,
      status: "active",
      emergencyContact: "",
      address: "",
      occupation: "",
      idProof: "",
      avatar: "",
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (tenant: Tenant) => {
    setEditingTenant(tenant)
    setNewTenant(tenant)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingTenant(null)
    setNewTenant({
      name: "",
      email: "",
      phone: "",
      roomNumber: "",
      checkInDate: "",
      rent: 0,
      deposit: 0,
      status: "active",
      emergencyContact: "",
      address: "",
      occupation: "",
      idProof: "",
      avatar: "",
    })
  }

  const handleSubmit = () => {
    if (!newTenant.name || !newTenant.email || !newTenant.phone || !newTenant.roomNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (editingTenant) {
      // Update existing tenant
      const updatedTenants = tenants.map((tenant) =>
        tenant.id === editingTenant.id ? { ...tenant, ...newTenant } : tenant,
      )
      setTenants(updatedTenants)
      toast({
        title: "Success",
        description: `Tenant ${newTenant.name} has been updated successfully`,
      })
    } else {
      // Add new tenant
      const tenant: Tenant = {
        id: Date.now().toString(),
        name: newTenant.name!,
        email: newTenant.email!,
        phone: newTenant.phone!,
        roomNumber: newTenant.roomNumber!,
        checkInDate: newTenant.checkInDate!,
        rent: Number(newTenant.rent) || 0,
        deposit: Number(newTenant.deposit) || 0,
        status: newTenant.status as "active" | "inactive" | "pending",
        emergencyContact: newTenant.emergencyContact!,
        address: newTenant.address!,
        occupation: newTenant.occupation!,
        idProof: newTenant.idProof!,
        avatar:
          newTenant.avatar ||
          `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face&auto=format`,
      }
      setTenants([...tenants, tenant])
      toast({
        title: "Success",
        description: `Tenant ${tenant.name} has been added successfully`,
      })
    }

    handleCloseDialog()
  }

  const handleDeleteTenant = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId)
    setTenants(tenants.filter((t) => t.id !== tenantId))
    toast({
      title: "Success",
      description: `Tenant ${tenant?.name} has been removed successfully`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-1">Manage your PG tenants and their information</p>
        </div>
        <Button
          onClick={handleOpenAddDialog}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTenant ? "Edit Tenant" : "Add New Tenant"}</DialogTitle>
            <DialogDescription>
              {editingTenant ? "Update tenant information" : "Enter the details for the new tenant"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="avatar">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={newTenant.avatar || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {newTenant.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    id="avatar"
                    value={newTenant.avatar}
                    onChange={(e) => setNewTenant({ ...newTenant, avatar: e.target.value })}
                    placeholder="https://example.com/profile-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter image URL or leave empty for default avatar</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newTenant.name}
                onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newTenant.email}
                onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={newTenant.phone}
                onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                placeholder="+91 9876543210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number *</Label>
              <Input
                id="roomNumber"
                value={newTenant.roomNumber}
                onChange={(e) => setNewTenant({ ...newTenant, roomNumber: e.target.value })}
                placeholder="101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkInDate">Check-in Date</Label>
              <Input
                id="checkInDate"
                type="date"
                value={newTenant.checkInDate}
                onChange={(e) => setNewTenant({ ...newTenant, checkInDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newTenant.status}
                onValueChange={(value) => setNewTenant({ ...newTenant, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent</Label>
              <Input
                id="rent"
                type="number"
                value={newTenant.rent || ""}
                onChange={(e) => setNewTenant({ ...newTenant, rent: Number(e.target.value) || 0 })}
                placeholder="8000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Security Deposit</Label>
              <Input
                id="deposit"
                type="number"
                value={newTenant.deposit || ""}
                onChange={(e) => setNewTenant({ ...newTenant, deposit: Number(e.target.value) || 0 })}
                placeholder="16000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={newTenant.emergencyContact}
                onChange={(e) => setNewTenant({ ...newTenant, emergencyContact: e.target.value })}
                placeholder="+91 9876543211"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={newTenant.occupation}
                onChange={(e) => setNewTenant({ ...newTenant, occupation: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idProof">ID Proof Type</Label>
              <Select
                value={newTenant.idProof}
                onValueChange={(value) => setNewTenant({ ...newTenant, idProof: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ID proof" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                  <SelectItem value="Driving License">Driving License</SelectItem>
                  <SelectItem value="Voter ID">Voter ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={newTenant.address}
                onChange={(e) => setNewTenant({ ...newTenant, address: e.target.value })}
                placeholder="Complete address..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingTenant ? "Update Tenant" : "Add Tenant"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tenants..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-16 w-16 border-2 border-gray-100">
                  <AvatarImage src={tenant.avatar || "/placeholder.svg"} alt={tenant.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg">
                    {tenant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{tenant.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                    <span className="text-sm text-gray-500">Room {tenant.roomNumber}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{tenant.occupation}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Since {new Date(tenant.checkInDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Rent:</span>
                  <p className="font-medium">₹{tenant.rent.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Deposit:</span>
                  <p className="font-medium">₹{tenant.deposit.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenEditDialog(tenant)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteTenant(tenant.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tenants found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first tenant."}
          </p>
        </div>
      )}
    </div>
  )
}
