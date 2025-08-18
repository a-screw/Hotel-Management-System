"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Building, Bell, Shield, Palette, Database, Mail, Phone, MapPin, Save, Upload } from "lucide-react"

export function Settings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General Settings
    pgName: "Sunrise PG",
    ownerName: "John Smith",
    email: "john@sunrisepg.com",
    phone: "+91 9876543210",
    address: "123 Main Street, City, State - 123456",
    description: "Premium paying guest accommodation with modern amenities",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    maintenanceAlerts: true,

    // Business Settings
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "30",

    // Appearance
    theme: "light",
    primaryColor: "#3b82f6",
  })

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Settings have been saved successfully",
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your PG settings and preferences</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700">
                  <Building className="mr-2 h-4 w-4" />
                  General
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Palette className="mr-2 h-4 w-4" />
                  Appearance
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Backup
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-500" />
                <CardTitle>General Settings</CardTitle>
              </div>
              <CardDescription>Basic information about your PG</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pgName">PG Name</Label>
                  <Input
                    id="pgName"
                    value={settings.pgName}
                    onChange={(e) => handleSettingChange("pgName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    value={settings.ownerName}
                    onChange={(e) => handleSettingChange("ownerName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => handleSettingChange("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleSettingChange("address", e.target.value)}
                    className="pl-10"
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => handleSettingChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) => handleSettingChange("dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-green-500" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Reminders</Label>
                  <p className="text-sm text-gray-500">Send automatic payment reminders</p>
                </div>
                <Switch
                  checked={settings.paymentReminders}
                  onCheckedChange={(checked) => handleSettingChange("paymentReminders", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified about maintenance requests</p>
                </div>
                <Switch
                  checked={settings.maintenanceAlerts}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceAlerts", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-500" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-purple-500" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-orange-500" />
                <CardTitle>Backup & Data</CardTitle>
              </div>
              <CardDescription>Manage your data backup and export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-gray-500">Last backup: 2 hours ago</p>
                </div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Backup Now
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Data</Label>
                  <p className="text-sm text-gray-500">Download all your data</p>
                </div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
