import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Users, DollarSign, TrendingUp, Settings, UserPlus, CreditCard, BarChart3, Bell, Search, Filter, Download, Edit, Trash2, Eye, Mail, Phone, Calendar, MapPin, Building, Star, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [customers, setCustomers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading customer data
    setCustomers([
      {
        id: 1,
        dealershipName: 'Sunset Auto Sales',
        contactName: 'John Smith',
        email: 'john@sunsetauto.com',
        phone: '(555) 123-4567',
        location: 'Phoenix, AZ',
        subscription: 'Professional',
        status: 'Active',
        joinDate: '2024-01-15',
        lastLogin: '2024-01-20',
        monthlyRevenue: 397,
        totalRevenue: 3970,
        postsGenerated: 156,
        engagement: 2847,
        platforms: ['Facebook', 'Instagram', 'TikTok', 'Reddit', 'X']
      },
      {
        id: 2,
        dealershipName: 'Metro Motors',
        contactName: 'Sarah Johnson',
        email: 'sarah@metromotors.com',
        phone: '(555) 987-6543',
        location: 'Denver, CO',
        subscription: 'Starter',
        status: 'Active',
        joinDate: '2024-01-10',
        lastLogin: '2024-01-19',
        monthlyRevenue: 197,
        totalRevenue: 1970,
        postsGenerated: 89,
        engagement: 1245,
        platforms: ['Facebook', 'Instagram', 'X']
      },
      {
        id: 3,
        dealershipName: 'Elite Auto Group',
        contactName: 'Michael Brown',
        email: 'mike@eliteauto.com',
        phone: '(555) 456-7890',
        location: 'Miami, FL',
        subscription: 'Enterprise',
        status: 'Active',
        joinDate: '2023-12-20',
        lastLogin: '2024-01-20',
        monthlyRevenue: 597,
        totalRevenue: 7164,
        postsGenerated: 234,
        engagement: 4521,
        platforms: ['Facebook', 'Instagram', 'TikTok', 'Reddit', 'X', 'YouTube']
      },
      {
        id: 4,
        dealershipName: 'Budget Cars Plus',
        contactName: 'Lisa Davis',
        email: 'lisa@budgetcars.com',
        phone: '(555) 321-0987',
        location: 'Austin, TX',
        subscription: 'Trial',
        status: 'Trial',
        joinDate: '2024-01-18',
        lastLogin: '2024-01-20',
        monthlyRevenue: 0,
        totalRevenue: 0,
        postsGenerated: 12,
        engagement: 89,
        platforms: ['Facebook', 'Instagram']
      },
      {
        id: 5,
        dealershipName: 'Classic Car Corner',
        contactName: 'Robert Wilson',
        email: 'rob@classiccar.com',
        phone: '(555) 654-3210',
        location: 'Nashville, TN',
        subscription: 'Professional',
        status: 'Cancelled',
        joinDate: '2023-11-05',
        lastLogin: '2024-01-15',
        monthlyRevenue: 0,
        totalRevenue: 2382,
        postsGenerated: 98,
        engagement: 1567,
        platforms: ['Facebook', 'Instagram', 'TikTok', 'Reddit', 'X']
      }
    ])

    // Simulate analytics data
    setAnalytics({
      totalCustomers: 5,
      activeSubscriptions: 4,
      monthlyRevenue: 1191,
      totalRevenue: 15486,
      churnRate: 8.5,
      averageEngagement: 2053,
      revenueGrowth: 23.5,
      customerGrowth: 15.2
    })
  }, [])

  // Revenue chart data
  const revenueData = [
    { month: 'Jul', revenue: 2400 },
    { month: 'Aug', revenue: 3200 },
    { month: 'Sep', revenue: 4100 },
    { month: 'Oct', revenue: 5300 },
    { month: 'Nov', revenue: 6800 },
    { month: 'Dec', revenue: 8900 },
    { month: 'Jan', revenue: 11200 }
  ]

  // Customer growth data
  const customerGrowthData = [
    { month: 'Jul', customers: 12 },
    { month: 'Aug', customers: 18 },
    { month: 'Sep', customers: 25 },
    { month: 'Oct', customers: 34 },
    { month: 'Nov', customers: 45 },
    { month: 'Dec', customers: 58 },
    { month: 'Jan', customers: 67 }
  ]

  // Subscription distribution data
  const subscriptionData = [
    { name: 'Trial', value: 1, color: '#8884d8' },
    { name: 'Starter', value: 1, color: '#82ca9d' },
    { name: 'Professional', value: 2, color: '#ffc658' },
    { name: 'Enterprise', value: 1, color: '#ff7300' }
  ]

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.dealershipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { variant: 'default', icon: CheckCircle, color: 'text-green-600' },
      'Trial': { variant: 'secondary', icon: Clock, color: 'text-blue-600' },
      'Cancelled': { variant: 'destructive', icon: XCircle, color: 'text-red-600' },
      'Suspended': { variant: 'outline', icon: AlertTriangle, color: 'text-yellow-600' }
    }
    
    const config = statusConfig[status] || statusConfig['Active']
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status}
      </Badge>
    )
  }

  const getSubscriptionBadge = (subscription) => {
    const colors = {
      'Trial': 'bg-gray-100 text-gray-800',
      'Starter': 'bg-blue-100 text-blue-800',
      'Professional': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-orange-100 text-orange-800'
    }
    
    return (
      <Badge className={colors[subscription] || colors['Trial']}>
        {subscription}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">DealerFlow Pro Admin</h1>
            <Badge variant="outline" className="text-xs">
              Business Control Panel
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{analytics.customerGrowth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.monthlyRevenue?.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{analytics.revenueGrowth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeSubscriptions}</div>
                  <p className="text-xs text-muted-foreground">
                    {analytics.churnRate}% churn rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.averageEngagement?.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Per customer per month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                  <CardDescription>Monthly recurring revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                  <CardDescription>Total customers over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={customerGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="customers" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Customer Activity</CardTitle>
                <CardDescription>Latest customer actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.slice(0, 5).map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{customer.dealershipName}</p>
                          <p className="text-sm text-gray-500">Last login: {customer.lastLogin}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSubscriptionBadge(customer.subscription)}
                        {getStatusBadge(customer.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>Manage your dealership customers and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Customers</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by name, email, or dealership..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="filter">Filter by Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Customer Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dealership</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{customer.dealershipName}</p>
                              <p className="text-sm text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {customer.location}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{customer.contactName}</p>
                              <p className="text-sm text-gray-500 flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {customer.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getSubscriptionBadge(customer.subscription)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(customer.status)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">${customer.monthlyRevenue}/mo</p>
                              <p className="text-sm text-gray-500">${customer.totalRevenue} total</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{customer.engagement.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">{customer.postsGenerated} posts</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{customer.dealershipName} - Customer Details</DialogTitle>
                                    <DialogDescription>
                                      Complete customer information and account details
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCustomer && (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-4">
                                        <div>
                                          <Label>Contact Information</Label>
                                          <div className="space-y-2 mt-2">
                                            <p className="flex items-center text-sm">
                                              <Users className="h-4 w-4 mr-2" />
                                              {selectedCustomer.contactName}
                                            </p>
                                            <p className="flex items-center text-sm">
                                              <Mail className="h-4 w-4 mr-2" />
                                              {selectedCustomer.email}
                                            </p>
                                            <p className="flex items-center text-sm">
                                              <Phone className="h-4 w-4 mr-2" />
                                              {selectedCustomer.phone}
                                            </p>
                                            <p className="flex items-center text-sm">
                                              <MapPin className="h-4 w-4 mr-2" />
                                              {selectedCustomer.location}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <Label>Account Details</Label>
                                          <div className="space-y-2 mt-2">
                                            <p className="flex items-center text-sm">
                                              <Calendar className="h-4 w-4 mr-2" />
                                              Joined: {selectedCustomer.joinDate}
                                            </p>
                                            <p className="flex items-center text-sm">
                                              <Clock className="h-4 w-4 mr-2" />
                                              Last Login: {selectedCustomer.lastLogin}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        <div>
                                          <Label>Subscription & Revenue</Label>
                                          <div className="space-y-2 mt-2">
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm">Plan:</span>
                                              {getSubscriptionBadge(selectedCustomer.subscription)}
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm">Status:</span>
                                              {getStatusBadge(selectedCustomer.status)}
                                            </div>
                                            <p className="text-sm">Monthly: ${selectedCustomer.monthlyRevenue}</p>
                                            <p className="text-sm">Total: ${selectedCustomer.totalRevenue}</p>
                                          </div>
                                        </div>
                                        <div>
                                          <Label>Platform Usage</Label>
                                          <div className="space-y-2 mt-2">
                                            <p className="text-sm">Posts Generated: {selectedCustomer.postsGenerated}</p>
                                            <p className="text-sm">Total Engagement: {selectedCustomer.engagement.toLocaleString()}</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                              {selectedCustomer.platforms.map((platform) => (
                                                <Badge key={platform} variant="outline" className="text-xs">
                                                  {platform}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {customer.dealershipName}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Overview</CardTitle>
                    <CardDescription>Current subscription distribution and management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Trial', 'Starter', 'Professional', 'Enterprise'].map((plan) => {
                        const count = customers.filter(c => c.subscription === plan).length
                        const revenue = customers
                          .filter(c => c.subscription === plan)
                          .reduce((sum, c) => sum + c.monthlyRevenue, 0)
                        
                        return (
                          <div key={plan} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              {getSubscriptionBadge(plan)}
                              <div>
                                <p className="font-medium">{count} customers</p>
                                <p className="text-sm text-gray-500">${revenue}/month revenue</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={subscriptionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {subscriptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Engagement Metrics</CardTitle>
                  <CardDescription>Average engagement across all customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Posts per Customer</span>
                      <span className="font-bold">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Engagement per Post</span>
                      <span className="font-bold">18.3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Platform Coverage</span>
                      <span className="font-bold">3.2 platforms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Content Generation Rate</span>
                      <span className="font-bold">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Health Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Customer Lifetime Value</span>
                      <span className="font-bold">$4,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Churn Rate</span>
                      <span className="font-bold text-red-600">8.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Trial Conversion Rate</span>
                      <span className="font-bold text-green-600">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Revenue per User</span>
                      <span className="font-bold">$318</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Recurring Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${analytics.monthlyRevenue?.toLocaleString()}</div>
                  <p className="text-sm text-green-600">+{analytics.revenueGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Annual Run Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${(analytics.monthlyRevenue * 12)?.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">Based on current MRR</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${analytics.totalRevenue?.toLocaleString()}</div>
                  <p className="text-sm text-gray-500">All-time revenue</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown by Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Starter', 'Professional', 'Enterprise'].map((plan) => {
                    const planCustomers = customers.filter(c => c.subscription === plan && c.status === 'Active')
                    const planRevenue = planCustomers.reduce((sum, c) => sum + c.monthlyRevenue, 0)
                    const percentage = ((planRevenue / analytics.monthlyRevenue) * 100).toFixed(1)
                    
                    return (
                      <div key={plan} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{plan} Plan</span>
                          <span>${planRevenue}/month ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="DealerFlow Pro" />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" defaultValue="support@dealerflowpro.com" />
                  </div>
                  <div>
                    <Label htmlFor="trial-period">Trial Period (days)</Label>
                    <Input id="trial-period" type="number" defaultValue="14" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <CardDescription>Manage pricing and plan features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Starter Plan - $197/month</Label>
                    <p className="text-sm text-gray-500">3 platforms, 200 posts/month, 500 images</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Professional Plan - $397/month</Label>
                    <p className="text-sm text-gray-500">5 platforms, 1000 posts/month, 2000 images</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Enterprise Plan - $597/month</Label>
                    <p className="text-sm text-gray-500">6 platforms, unlimited posts, unlimited images</p>
                  </div>
                  <Button>Edit Plans</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

