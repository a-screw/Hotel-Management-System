"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, Filter, Edit, Trash2, Users, Bed, Wifi, Car, Utensils, Tv, Wind } from "lucide-react"

interface Room {
  id: string
  number: string
  type: string
  rent: number
  deposit: number
  status: "occupied" | "vacant" | "maintenance"
  tenant?: string
  amenities: string[]
  floor: number
  description: string
}

const initialRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "Single",
    rent: 8000,
    deposit: 16000,
    status: "occupied",
    tenant: "John Doe",
    amenities: ["wifi", "ac", "tv"],
    floor: 1,
    description: "Spacious single room with attached bathroom",
  },
  {
    id: "2",
    number: "102",
    type: "Double",
    rent: 12000,
    deposit: 24000,
    status: "vacant",
    amenities: ["wifi", "ac", "parking"],
    floor: 1,
    description: "Double sharing room with balcony",
  },
  {
    id: "3",
    number: "201",
    type: "Single",
    rent: 9000,
    deposit: 18000,
    status: "maintenance",
    amenities: ["wifi", "ac", "tv", "meals"],
    floor: 2,
    description: "Premium single room with meal facility",
  },
]

const amenityIcons = {
  wifi: Wifi,
  ac: Wind,
  tv: Tv,
  parking: Car,
  meals: Utensils,
}

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const { toast } = useToast()

  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    number: "",
    type: "Single",
    rent: 0,
    deposit: 0,
    status: "vacant",
    amenities: [],
    floor: 1,
    description: "",
  })

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.tenant?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || room.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleOpenAddDialog = () => {
    setEditingRoom(null)
    setNewRoom({
      number: "",
      type: "Single",
      rent: 0,
      deposit: 0,
      status: "vacant",
      amenities: [],
      floor: 1,
      description: "",
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (room: Room) => {
    setEditingRoom(room)
    setNewRoom(room)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingRoom(null)
    setNewRoom({
      number: "",
      type: "Single",
      rent: 0,
      deposit: 0,
      status: "vacant",
      amenities: [],
      floor: 1,
      description: "",
    })
  }

  const handleSubmit = () => {
    if (!newRoom.number || !newRoom.rent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (editingRoom) {
      // Update existing room
      const updatedRooms = rooms.map((room) => (room.id === editingRoom.id ? { ...room, ...newRoom } : room))
      setRooms(updatedRooms)
      toast({
        title: "Success",
        description: `Room ${newRoom.number} has been updated successfully`,
      })
    } else {
      // Add new room
      const room: Room = {
        id: Date.now().toString(),
        number: newRoom.number!,
        type: newRoom.type!,
        rent: Number(newRoom.rent) || 0,
        deposit: Number(newRoom.deposit) || 0,
        status: newRoom.status as "occupied" | "vacant" | "maintenance",
        amenities: newRoom.amenities!,
        floor: Number(newRoom.floor) || 1,
        description: newRoom.description!,
      }
      setRooms([...rooms, room])
      toast({
        title: "Success",
        description: `Room ${room.number} has been added successfully`,
      })
    }

    handleCloseDialog()
  }

  const handleDeleteRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    setRooms(rooms.filter((r) => r.id !== roomId))
    toast({
      title: "Success",
      description: `Room ${room?.number} has been deleted successfully`,
    })
  }

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = newRoom.amenities || []
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity]
    setNewRoom({ ...newRoom, amenities: updatedAmenities })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-1">Manage your PG rooms and their details</p>
        </div>
        <Button
          onClick={handleOpenAddDialog}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
            <DialogDescription>
              {editingRoom ? "Update room details" : "Enter the details for the new room"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Room Number *</Label>
              <Input
                id="number"
                value={newRoom.number}
                onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                placeholder="e.g., 101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Room Type</Label>
              <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Triple">Triple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent *</Label>
              <Input
                id="rent"
                type="number"
                value={newRoom.rent || ""}
                onChange={(e) => setNewRoom({ ...newRoom, rent: Number(e.target.value) || 0 })}
                placeholder="8000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Security Deposit</Label>
              <Input
                id="deposit"
                type="number"
                value={newRoom.deposit || ""}
                onChange={(e) => setNewRoom({ ...newRoom, deposit: Number(e.target.value) || 0 })}
                placeholder="16000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                value={newRoom.floor || ""}
                onChange={(e) => setNewRoom({ ...newRoom, floor: Number(e.target.value) || 1 })}
                placeholder="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newRoom.status}
                onValueChange={(value) => setNewRoom({ ...newRoom, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Amenities</Label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(amenityIcons).map((amenity) => (
                  <Button
                    key={amenity}
                    type="button"
                    variant={newRoom.amenities?.includes(amenity) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAmenity(amenity)}
                    className="capitalize"
                  >
                    {amenity}
                  </Button>
                ))}
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newRoom.description}
                onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                placeholder="Room description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingRoom ? "Update Room" : "Add Room"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search rooms or tenants..."
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
            <SelectItem value="vacant">Vacant</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Room {room.number}</CardTitle>
                <Badge
                  variant={
                    room.status === "occupied" ? "default" : room.status === "vacant" ? "secondary" : "destructive"
                  }
                  className={
                    room.status === "occupied"
                      ? "bg-green-100 text-green-800"
                      : room.status === "vacant"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {room.status}
                </Badge>
              </div>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <p className="font-medium">{room.type}</p>
                </div>
                <div>
                  <span className="text-gray-500">Floor:</span>
                  <p className="font-medium">{room.floor}</p>
                </div>
                <div>
                  <span className="text-gray-500">Rent:</span>
                  <p className="font-medium">₹{room.rent.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Deposit:</span>
                  <p className="font-medium">₹{room.deposit.toLocaleString()}</p>
                </div>
              </div>

              {room.tenant && (
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{room.tenant}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {room.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                  return (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      <Icon className="w-3 h-3 mr-1" />
                      {amenity}
                    </Badge>
                  )
                })}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenEditDialog(room)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Bed className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No rooms found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first room."}
          </p>
        </div>
      )}
    </div>
  )
}
