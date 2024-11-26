"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Camera, ClipboardList, Heart, LogOut, SquarePen, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
import {getUserById} from "@/lib/data";
import useSWR from "swr";

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
})

const getUser = async (id: string) => {
    const user = await getUserById(id);
    return user;
};

export default function Account() {

    const userId = sessionStorage.getItem('userId');

    const { data: userInfo, error } = useSWR(userId, getUser)

    console.log("user", userInfo);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }
    return (
        <div className="grow flex flex-col gap-5 md:px-8">
            <h2 className="font-semibold text-xl md:text-2xl">Tài khoản của tôi</h2>
            <div className="flex flex-col md:flex-row gap-8 p-4 md:p-16 border-2 rounded-md bg-white">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 md:gap-6 w-full md:w-auto">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32">
                        <AvatarImage src={userInfo?.[0]?.imageUrl ?? undefined} />
                        <AvatarFallback><Camera className="w-10 h-10" /></AvatarFallback>
                    </Avatar>
                    <Button variant={"outline"} className="w-full md:w-5/6 h-11/12 border-amber-500 text-amber-500 text-sm md:text-xs hover:bg-amber-500 hover:bg-opacity-20 hover:text-amber-500">
                        <SquarePen className="stroke-amber-500 w-4 h-4" /> Thay đổi ảnh
                    </Button>
                </div>

                {/* Form Section */}
                {/* //<Form {...form}> */}
                <div className="flex flex-col gap-4 md:gap-6 w-full">
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="w-full">
                            <p>Họ và tên:</p>
                            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0"  value={userInfo?.[0]?.name || ""}/>
                        </div>
                        <div className="w-full">
                            <p>Email:</p>
                            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0" value={userInfo?.[0]?.email || ""} />
                        </div>
                        <div className="w-full">
                            <p>Số điện thoại:</p>
                            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0" value={userInfo?.[0]?.phone || ""} />
                        </div>
                    </div>
                    <div>
                        <p>Địa chỉ:</p>
                        <Input className="focus-visible:ring-0 focus-visible:ring-offset-0" value={userInfo?.[0]?.address || ""} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <p>Giới tính: </p>
                        <RadioGroup defaultValue="option-one" className="flex flex-row gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Nam</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Nữ</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-three" id="option-three" />
                                <Label htmlFor="option-three">Khác</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="font-normal text-base">Ngày sinh: </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full md:w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Chọn ngày/ tháng/ năm</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date: Date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                    <Button className="w-full md:w-1/5 bg-amber-500">Lưu thay đổi</Button>
                </div>
            </div>
        </div>
    );
}
