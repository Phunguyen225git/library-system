import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const borrowTrendData = [
  { name: "Tháng 1", "Lượt mượn": 140, "Lượt trả": 110 },
  { name: "Tháng 2", "Lượt mượn": 220, "Lượt trả": 180 },
  { name: "Tháng 3", "Lượt mượn": 390, "Lượt trả": 280 },
  { name: "Tháng 4", "Lượt mượn": 480, "Lượt trả": 410 },
  { name: "Tháng 5", "Lượt mượn": 560, "Lượt trả": 520 },
];

const categoryData = [
  { name: "Lập trình & Công nghệ", value: 45, color: "#4f46e5" },
  { name: "Kinh tế & Khởi nghiệp", value: 25, color: "#06b6d4" },
  { name: "Kỹ năng sống", value: 20, color: "#f59e0b" },
  { name: "Văn học & Tiểu thuyết", value: 10, color: "#ec4899" },
];

export function ChartsOverview() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Biểu đồ xu hướng mượn trả */}
      <Card className="lg:col-span-2 border border-slate-100 rounded-2xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900">
            Biểu Đồ Xu Hướng Mượn & Trả Sách
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium text-xs">
            So sánh số lượng sách luân chuyển qua các tháng đầu năm 2026.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 pl-0">
          <ResponsiveContainer className="w-100% h-100%">
            <BarChart
              data={borrowTrendData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              {/* Đường lưới tự động đổi màu theo border của theme */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-border"
              />

              {/* Chữ của trục X và Y tự động ăn theo màu chữ mờ của theme */}
              <XAxis
                dataKey="name"
                className="fill-muted-foreground"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="fill-muted-foreground"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              {/* Ô Tooltip khi rà chuột vào tự động đổi từ nền tối sang nền sáng tùy theo theme */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Bar
                dataKey="Lượt mượn"
                fill="hsl(var(--chart-1))"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="Lượt trả"
                fill="#06b6d4"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Biểu đồ tròn cơ cấu danh mục */}
      <Card className="border border-slate-100 rounded-2xl bg-white shadow-sm flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900">
            Danh Mục Sách Yêu Thích
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium text-xs">
            Tỷ lệ quan tâm của sinh viên theo thể loại.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center h-48">
          <ResponsiveContainer className="w-100% h-45">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                // fill="hsl(var(--chart-1))"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs font-semibold text-slate-600">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="truncate">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// // src/app/admin/components/charts-overview.tsx
// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";

// // Dữ liệu mẫu (giữ nguyên hoặc đổi tên theo ảnh của bạn)
// const borrowTrendData = [
//   { name: "Jan", Total: 190, Successful: 110 },
//   { name: "Feb", Total: 300, Successful: 200 },
//   { name: "Mar", Total: 240, Successful: 140 },
//   { name: "Apr", Total: 100, Successful: 190 },
//   { name: "May", Total: 210, Successful: 130 },
//   { name: "Jun", Total: 220, Successful: 150 },
// ];

// export function ChartsOverview() {
//   return (
//     <Card className="border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
//       <CardHeader>
//         <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
//           Analytics Overview
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="h-80 pl-0">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={borrowTrendData}
//             margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               className="stroke-slate-100 dark:stroke-slate-800"
//             />
//             <XAxis
//               dataKey="name"
//               stroke="#94a3b8"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />
//             <YAxis
//               stroke="#94a3b8"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "var(--card)",
//                 borderColor: "var(--border)",
//                 borderRadius: "12px",
//                 color: "var(--foreground)",
//               }}
//             />

//             {/* 🌟 ĐÂY RỒI: Dùng var() để gán màu động từ hệ thống CSS Variables */}
//             <Bar
//               dataKey="Total"
//               fill="hsl(var(--chart-1))"
//               radius={[4, 4, 0, 0]}
//               barSize={20}
//             />
//             <Bar
//               dataKey="Successful"
//               fill="hsl(var(--chart-2))"
//               radius={[4, 4, 0, 0]}
//               barSize={20}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
