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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Search,
  Filter,
  Download,
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
} from "lucide-react"

interface Payment {
  id: string
  tenantName: string
  roomNumber: string
  amount: number
  type: "rent" | "deposit" | "maintenance" | "electricity" | "other"
  status: "paid" | "pending" | "overdue"
  dueDate: string
  paidDate?: string
  paymentMethod?: string
  transactionId?: string
  notes?: string
}

const initialPayments: Payment[] = [
  {
    id: "1",
    tenantName: "John Doe",
    roomNumber: "101",
    amount: 8000,
    type: "rent",
    status: "paid",
    dueDate: "2024-01-01",
    paidDate: "2024-01-01",
    paymentMethod: "UPI",
    transactionId: "TXN123456789",
  },
  {
    id: "2",
    tenantName: "Sarah Wilson",
    roomNumber: "205",
    amount: 9000,
    type: "rent",
    status: "pending",
    dueDate: "2024-01-01",
  },
  {
    id: "3",
    tenantName: "Mike Johnson",
    roomNumber: "102",
    amount: 8000,
    type: "rent",
    status: "overdue",
    dueDate: "2023-12-01",
  },
  {
    id: "4",
    tenantName: "John Doe",
    roomNumber: "101",
    amount: 1200,
    type: "electricity",
    status: "paid",
    dueDate: "2024-01-15",
    paidDate: "2024-01-14",
    paymentMethod: "Cash",
  },
]

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    tenantName: "",
    roomNumber: "",
    amount: 0,
    type: "rent",
    status: "pending",
    dueDate: "",
    paymentMethod: "",
    notes: "",
  })

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || payment.roomNumber.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesType = filterType === "all" || payment.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const handleOpenAddDialog = () => {
    setNewPayment({
      tenantName: "",
      roomNumber: "",
      amount: 0,
      type: "rent",
      status: "pending",
      dueDate: "",
      paymentMethod: "",
      notes: "",
    })
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setNewPayment({
      tenantName: "",
      roomNumber: "",
      amount: 0,
      type: "rent",
      status: "pending",
      dueDate: "",
      paymentMethod: "",
      notes: "",
    })
  }

  const handleSubmit = () => {
    if (!newPayment.tenantName || !newPayment.roomNumber || !newPayment.amount || !newPayment.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const payment: Payment = {
      id: Date.now().toString(),
      tenantName: newPayment.tenantName!,
      roomNumber: newPayment.roomNumber!,
      amount: Number(newPayment.amount) || 0,
      type: newPayment.type as "rent" | "deposit" | "maintenance" | "electricity" | "other",
      status: newPayment.status as "paid" | "pending" | "overdue",
      dueDate: newPayment.dueDate!,
      paymentMethod: newPayment.paymentMethod,
      notes: newPayment.notes,
    }

    setPayments([...payments, payment])
    handleCloseDialog()

    toast({
      title: "Success",
      description: `Payment record for ${payment.tenantName} has been added successfully`,
    })
  }

  const handleMarkAsPaid = (paymentId: string) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === paymentId
        ? { ...payment, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0] }
        : payment,
    )
    setPayments(updatedPayments)

    const payment = payments.find((p) => p.id === paymentId)
    toast({
      title: "Success",
      description: `Payment for ${payment?.tenantName} marked as paid`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = filteredPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = filteredPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const overdueAmount = filteredPayments
    .filter((p) => p.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all payments from tenants</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={handleOpenAddDialog}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Payment
          </Button>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Payment Record</DialogTitle>
            <DialogDescription>Create a new payment record for a tenant</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tenantName">Tenant Name *</Label>
              <Input
                id="tenantName"
                value={newPayment.tenantName}
                onChange={(e) => setNewPayment({ ...newPayment, tenantName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number *</Label>
              <Input
                id="roomNumber"
                value={newPayment.roomNumber}
                onChange={(e) => setNewPayment({ ...newPayment, roomNumber: e.target.value })}
                placeholder="101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                value={newPayment.amount || ""}
                onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) || 0 })}
                placeholder="8000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Payment Type</Label>
              <Select
                value={newPayment.type}
                onValueChange={(value) => setNewPayment({ ...newPayment, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={newPayment.dueDate}
                onChange={(e) => setNewPayment({ ...newPayment, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newPayment.status}
                onValueChange={(value) => setNewPayment({ ...newPayment, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={newPayment.paymentMethod}
                onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={newPayment.notes}
                onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{paidAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pending</CardTitle>
            <Clock className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{overdueAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search payments..."
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
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="electricity">Electricity</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
          <CardDescription>All payment transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.tenantName}</TableCell>
                  <TableCell>{payment.roomNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {payment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(payment.status)}
                        <span className="capitalize">{payment.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.status !== "paid" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsPaid(payment.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        Mark Paid
                      </Button>
                    )}
                    {payment.status === "paid" && (
                      <Button size="sm" variant="outline">
                        <Receipt className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all" || filterType !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first payment record."}
          </p>
        </div>
      )}
    </div>
  )
}
