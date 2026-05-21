/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/books/book-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";

const bookSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  author: z.string().min(1, "Tác giả không được để trống"),
  description: z.string().optional(),
  image: z.string().optional(),
  totalCopies: z.coerce.number().min(1, "Số lượng ít nhất là 1"),
  pricePerDay: z.coerce.number().min(0, "Giá thuê không được âm"),
});

export function BookForm({
  initialData,
  onSubmitSuccess,
}: {
  initialData?: any;
  onSubmitSuccess: (values: any) => Promise<void> | void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData || {
      title: "",
      author: "",
      description: "",
      image: "",
      totalCopies: 1,
      pricePerDay: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    setIsLoading(true);
    await onSubmitSuccess(values);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Tiêu đề  */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Tác giả */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tác giả</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* KHU VỰC UPLOAD ẢNH */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh bìa sách</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200 p-4 rounded-lg bg-slate-50">
                  {field.value ? (
                    // Nếu đã có ảnh (Vừa upload xong hoặc đang sửa sách cũ) -> Hiện ảnh và nút Xóa
                    <div className="relative w-32 h-44 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={field.value}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => field.onChange("")} // Xóa link ảnh
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    // Nếu chưa có ảnh -> Hiện nút Upload
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Upload thành công -> Lấy link ảnh từ Cloud lưu vào Form
                        field.onChange(res[0].ufsUrl);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`Lỗi upload: ${error.message}`);
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Mô tả chi tiết */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả chi tiết</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Số lượng sách còn trong kho */}
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng tổng</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Giá thuê sách */}
        <FormField
          control={form.control}
          name="pricePerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá thuê mỗi ngày</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Đang lưu..." : "Lưu sách"}
        </Button>
      </form>
    </Form>
  );
}
// "use client";

// import { useForm } from "react-hook-form";
// import { Button } from "@/src/components/ui/button";
// import { Input } from "@/src/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/src/components/ui/form";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function BookForm({ initialData, onSubmit, isLoading }: any) {
//   const form = useForm({
//     defaultValues: initialData || {
//       title: "",
//       author: "",
//       description: "",
//       totalCopies: 1,
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tiêu đề</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="author"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tác giả</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="totalCopies"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Số lượng</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(parseInt(e.target.value))}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? "Đang lưu..." : "Xác nhận"}
//         </Button>
//       </form>
//     </Form>
//   );
// }
