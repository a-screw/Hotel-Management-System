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
import {
  Plus,
  Search,
  Filter,
  Receipt,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface Expense {
  id: string
  title: string
  category: "maintenance" | "utilities" | "supplies" | "staff" | "marketing" | "other"
  amount: number
  date: string
  description: string
  paymentMethod: string
  vendor?: string
  receipt?: string
}

const initialExpenses: Expense[] = [
  {
    id: "1",
    title: "Electricity Bill",
    category: "utilities",
    amount: 15000,
    date: "2024-01-15",
    description: "Monthly electricity bill for the building",
    paymentMethod: "Bank Transfer",
    vendor: "State Electricity Board",
  },
  {
    id: "2",
    title: "Plumbing Repair",
    category: "maintenance",
    amount: 3500,
    date: "2024-01-12",
    description: "Fixed leaking pipes in rooms 201-205",
    paymentMethod: "Cash",
    vendor: "Kumar Plumbing Services",
  },
  {
    id: "3",
    title: "Cleaning Supplies",
    category: "supplies",
    amount: 2800,
    date: "2024-01-10",
    description: "Monthly cleaning supplies and detergents",
    paymentMethod: "UPI",
    vendor: "Clean & Fresh Supplies",
  },
  {
    id: "4",
    title: "Security Guard Salary",
    category: "staff",
    amount: 18000,
    date: "2024-01-01",
    description: "Monthly salary for security guard",
    paymentMethod: "Bank Transfer",
    vendor: "Ramesh Kumar",
  },
]

const categoryColors = {
  maintenance: "#3b82f6",
  utilities: "#ef4444",
  supplies: "#10b981",
  staff: "#f59e0b",
  marketing: "#8b5cf6",
  other: "#6b7280",
}

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const { toast } = useToast()

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    title: "",
    category: "other",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    description: "",
    paymentMethod: "Cash",
    vendor: "",
  })

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenAddDialog = () => {
    setEditingExpense(null)
    setNewExpense({
      title: "",
      category: "other",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
      paymentMethod: "Cash",
      vendor: "",
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (expense: Expense) => {
    setEditingExpense(expense)
    setNewExpense(expense)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingExpense(null)
    setNewExpense({
      title: "",
      category: "other",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
      paymentMethod: "Cash",
      vendor: "",
    })
  }

  const handleSubmit = () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (editingExpense) {
      // Update existing expense
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editingExpense.id ? { ...expense, ...newExpense } : expense,
      )
      setExpenses(updatedExpenses)
      toast({
        title: "Success",
        description: `Expense "${newExpense.title}" has been updated successfully`,
      })
    } else {
      // Add new expense
      const expense: Expense = {
        id: Date.now().toString(),
        title: newExpense.title!,
        category: newExpense.category as any,
        amount: Number(newExpense.amount) || 0,
        date: newExpense.date!,
        description: newExpense.description!,
        paymentMethod: newExpense.paymentMethod!,
        vendor: newExpense.vendor,
      }
      setExpenses([...expenses, expense])
      toast({
        title: "Success",
        description: `Expense "${expense.title}" has been added successfully`,
      })
    }

    handleCloseDialog()
  }

  const handleDeleteExpense = (expenseId: string) => {
    const expense = expenses.find((e) => e.id === expenseId)
    setExpenses(expenses.filter((e) => e.id !== expenseId))
    toast({
      title: "Success",
      description: `Expense "${expense?.title}" has been deleted successfully`,
    })
  }

  // Calculate totals and analytics
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const thisMonthExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })
    .reduce((sum, expense) => sum + expense.amount, 0)

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const lastMonthExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear
    })
    .reduce((sum, expense) => sum + expense.amount, 0)

  const monthlyChange = lastMonthExpenses > 0 ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0

  // Category breakdown for pie chart
  const categoryData = Object.keys(categoryColors)
    .map((category) => ({
      name: category,
      value: expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0),
      color: categoryColors[category as keyof typeof categoryColors],
    }))
    .filter((item) => item.value > 0)

  // Monthly trend data
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    const month = date.toLocaleString("default", { month: "short" })
    const monthExpenses = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === date.getMonth() && expenseDate.getFullYear() === date.getFullYear()
      })
      .reduce((sum, expense) => sum + expense.amount, 0)

    return { month, amount: monthExpenses }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all your PG expenses</p>
        </div>
        <Button
          onClick={handleOpenAddDialog}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingExpense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
            <DialogDescription>
              {editingExpense ? "Update expense details" : "Record a new expense for your PG"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Expense Title *</Label>
              <Input
                id="title"
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                placeholder="Electricity Bill"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                value={newExpense.amount || ""}
                onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) || 0 })}
                placeholder="5000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={newExpense.paymentMethod}
                onValueChange={(value) => setNewExpense({ ...newExpense, paymentMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue />
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
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor/Payee</Label>
              <Input
                id="vendor"
                value={newExpense.vendor}
                onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                placeholder="Vendor name"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="Expense description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingExpense ? "Update Expense" : "Add Expense"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-xs opacity-90">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">This Month</CardTitle>
            <Calendar className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{thisMonthExpenses.toLocaleString()}</div>
            <p className="text-xs opacity-90">Current month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Monthly Change</CardTitle>
            {monthlyChange >= 0 ? (
              <TrendingUp className="h-4 w-4 opacity-90" />
            ) : (
              <TrendingDown className="h-4 w-4 opacity-90" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyChange >= 0 ? "+" : ""}
              {monthlyChange.toFixed(1)}%
            </div>
            <p className="text-xs opacity-90">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {categoryData.map((entry) => (
                <div key={entry.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm capitalize">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="supplies">Supplies</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expenses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExpenses.map((expense) => (
          <Card key={expense.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{expense.title}</CardTitle>
                <Badge
                  variant="outline"
                  className="capitalize"
                  style={{
                    backgroundColor: `${categoryColors[expense.category]}20`,
                    color: categoryColors[expense.category],
                    borderColor: categoryColors[expense.category],
                  }}
                >
                  {expense.category}
                </Badge>
              </div>
              <CardDescription>{expense.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-red-600">₹{expense.amount.toLocaleString()}</div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Receipt className="w-4 h-4 text-gray-400" />
                  <span>{expense.paymentMethod}</span>
                </div>
                {expense.vendor && (
                  <div className="text-gray-600">
                    <span className="font-medium">Vendor:</span> {expense.vendor}
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenEditDialog(expense)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first expense."}
          </p>
        </div>
      )}
    </div>
  )
}
