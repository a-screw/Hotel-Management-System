"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Building,
  Users,
  CreditCard,
  Wrench,
  Receipt,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "rooms", label: "Rooms", icon: Building },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">PG Manager</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1 h-8 w-8">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                collapsed ? "px-2" : "px-4",
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-100",
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className={cn("w-5 h-5", collapsed ? "mr-0" : "mr-3")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
