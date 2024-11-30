"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Camera, ClipboardList, Heart, LogOut, SquarePen, UserIcon } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getUserById } from "@/lib/data";
import useSWR from "swr";
import { updateUser } from "@/lib/actions/user";
import { genderEnum } from "@/drizzle/schema/auth";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LoadingSpinner from "@/components/ui/loading-spinner"

const getUser = async (id: string) => {
    const user = await getUserById(id);
    return user;
};

const formSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    name: z.string().min(1, "Tên người dùng không hợp lệ!"),
    gender: z.enum(genderEnum.enumValues as [string, ...string[]]),
    phone: z.string().min(10, "Số điện thoại không hợp lệ!"),
    birthday: z.object({
        day: z.string(),
        month: z.string(),
        year: z.string(),
    }),
    address: z.string().min(1, "Địa chỉ không hợp lệ!"),
});

export default function Account() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            gender: "",
            birthday: {
                day: "",
                month: "",
                year: "",
            },
            address: "",
        },
    });

    const userId = sessionStorage.getItem('userId');

    const { data: userInfo, isLoading, error } = useSWR(userId, getUser)
    const [shortName, setShortName] = useState<string>("");

    const splitName = (name: string) => {
        const array = name.split(" ");
        return (array[array.length - 2]?.at(0) || '') + (array[array.length - 1]?.at(0) || '');
    }

    useEffect(() => {
        if (userInfo && userInfo[0]) {
            const user = userInfo[0];
            form.reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                gender: user.gender || "",
                birthday: {
                    day: user.birthday ? format(new Date(user.birthday), "dd") : "",
                    month: user.birthday ? format(new Date(user.birthday), "MM") : "",
                    year: user.birthday ? format(new Date(user.birthday), "yyyy") : "",
                },
                address: user.address || "",
            });
        }
        setShortName(userInfo && userInfo[0]?.name ? splitName(userInfo[0].name) : "");
    }, [userInfo, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const data = new FormData();
            data.append("userId", userId?.toString() ?? "");
            data.append("name", values.name);
            data.append("email", values.email);
            data.append("phone", values.phone);
            data.append("gender", values.gender);
            const birthday = new Date(
                parseInt(values.birthday.year),
                parseInt(values.birthday.month) - 1,
                parseInt(values.birthday.day)
            );
            data.append("birthday", birthday.toISOString());
            data.append("address", values.address);

            await updateUser(data);
            toast({ description: "Cập nhật thông tin thành công!" });

        } catch (error) {
            console.log(error);
            toast({ description: "Cập nhật thông tin thất bại!" });
        }
        
    }

    return (
        isLoading ? <LoadingSpinner /> :
            <div className="grow flex flex-col gap-5 md:px-8">
                <h2 className="font-semibold text-xl sm:text-2xl">Tài khoản của tôi</h2>
                <div className="flex flex-wrap justify-center xl:justify-start gap-16 p-16 border-2 rounded-md bg-white">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-6 w-auto">
                        <Avatar className="w-40 h-40">
                            <AvatarImage src={userInfo?.[0]?.imageUrl ?? undefined} />
                            <AvatarFallback className="text-4xl">{shortName}</AvatarFallback>
                        </Avatar>
                        <Button variant={"outline"} className="w-full h-11/12 border-amber-500 text-amber-500 text-sm hover:bg-amber-500 hover:bg-opacity-20 hover:text-amber-500">
                            <SquarePen className="stroke-amber-500 w-4 h-4" /> Thay đổi ảnh
                        </Button>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col justify-center space-y-8 w-full lg:max-w-[510px]">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="font-medium">Họ và tên</div>
                                        <FormControl>
                                            <Input placeholder="Nhập họ và tên" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="font-medium">Số điện thoại</div>
                                        <FormControl>
                                            <Input placeholder="Nhập số điện thoại" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="font-medium">Email</div>
                                        <FormControl>
                                            <Input placeholder="Nhập email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Giới tính</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex gap-16"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Nam" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Nam
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Nữ" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Nữ
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Khác" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Khác
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-medium">Ngày sinh</FormLabel>
                                        <div className="flex space-x-2">
                                            <FormField
                                                control={form.control}
                                                name="birthday.day"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-[80px]">
                                                            <SelectValue placeholder="Ngày" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                                                <SelectItem key={day} value={day.toString().padStart(2, '0')}>
                                                                    {day}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="birthday.month"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-[120px]">
                                                            <SelectValue placeholder="Tháng" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                                                <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                                                                    Tháng {month}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="birthday.year"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-[100px]">
                                                            <SelectValue placeholder="Năm" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                                <SelectItem key={year} value={year.toString()}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="font-medium">Địa chỉ</div>
                                        <FormControl>
                                            <Input placeholder="Nhập địa chỉ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            <Button type="submit" className="w-full">Lưu thay đổi</Button>
                        </form>
                    </Form>

                </div>
            </div>
    );
}

