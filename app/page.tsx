"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { RoomManagement } from "@/components/room-management"
import { TenantManagement } from "@/components/tenant-management"
import { PaymentManagement } from "@/components/payment-management"
import { MaintenanceRequests } from "@/components/maintenance-requests"
import { ExpenseManagement } from "@/components/expense-management"
import { Reports } from "@/components/reports"
import { Settings } from "@/components/settings"
import { Toaster } from "@/components/ui/toaster"

export default function PGManagementSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "rooms":
        return <RoomManagement />
      case "tenants":
        return <TenantManagement />
      case "payments":
        return <PaymentManagement />
      case "maintenance":
        return <MaintenanceRequests />
      case "expenses":
        return <ExpenseManagement />
      case "reports":
        return <Reports />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{renderContent()}</main>
      </div>
      <Toaster />
    </div>
  )
}
