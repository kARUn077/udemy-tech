import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

  if(isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-[#537D5D]" />
    </div>
  )
  
  if(isError) return (
    <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-4 rounded-lg">
      Failed to get purchased courses
    </div>
  )

  const {purchasedCourse} = data || [];
  const courseData = purchasedCourse.map((course)=> ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
    sales: course.amount || 0
  }))

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-[#16213E] border-[#537D5D]/30 dark:border-[#537D5D]/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0]">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#537D5D] dark:text-[#6B8E71]">
              {totalSales}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#16213E] border-[#537D5D]/30 dark:border-[#537D5D]/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0]">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#537D5D] dark:text-[#6B8E71]">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#16213E] border-[#537D5D]/30 dark:border-[#537D5D]/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0]">
              Avg. Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#537D5D] dark:text-[#6B8E71]">
              ₹{totalSales > 0 ? Math.round(totalRevenue/totalSales) : 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#16213E] border-[#537D5D]/30 dark:border-[#537D5D]/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0]">
              Top Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-[#537D5D] dark:text-[#6B8E71] truncate">
              {courseData.length > 0 ? 
                courseData.reduce((max, course) => max.price > course.price ? max : course).name : 
                'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Course Prices Chart */}
        <Card className="bg-white dark:bg-[#16213E] border-[#537D5D]/30 dark:border-[#537D5D]/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#2D3748] dark:text-[#E2E8F0]">
              Course Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="name"
                    stroke="#718096"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#718096" />
                  <Tooltip 
                    contentStyle={{
                      background: '#FFFFFF',
                      borderColor: '#537D5D',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`₹${value}`, 'Price']}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#537D5D"
                    strokeWidth={2}
                    dot={{ stroke: '#537D5D', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Chart */}
        <Card className="bg-white dark:bg-[#16213E] border-[#537D5D]/30 dark:border-[#537D5D]/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#2D3748] dark:text-[#E2E8F0]">
              Course Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="name"
                    stroke="#718096"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#718096" />
                  <Tooltip 
                    contentStyle={{
                      background: '#FFFFFF',
                      borderColor: '#537D5D',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`₹${value}`, 'Sales']}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6B8E71"
                    strokeWidth={2}
                    dot={{ stroke: '#6B8E71', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;