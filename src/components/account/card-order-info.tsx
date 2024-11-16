
import { CalendarDays, Eye, MessageCircleQuestion } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export function CardOrderInfo() {
    return (
        <div className='flex gap-12 bg-white'>
            <div className='flex flex-col gap-2 w-full my-4 ml-4'>
                <p className='flex gap-2 pb-2 text-lg'>Trạng thái:<span className='font-semibold text-red-500'>Đang giao</span></p>
                <div className='flex pb-2 gap-4 border-b-2'>
                    <Image src={"/images/square.jpg"} alt="..." width={80} height={80} className="rounded-md" />
                    <div className='flex flex-col gap-1'>
                        <h4 className='font-medium text-xl'>Cơm chiên dương châu</h4>
                        <p className='text-lg'>Số lượng: 1</p>
                        <p className='text-lg'>Giá: <span className='font-semibold'>45.000đ</span></p>
                    </div>
                </div>
                <div className='flex w-full justify-end'>
                    <p className='flex items-center gap-2 text-lg'> <CalendarDays />Ngày đặt:
                        <span className='text-amber-500'>Ngày 11-12-2024</span></p>
                </div>
            </div>
            <div className='flex gap-4 p-4 items-start'>
                <TooltipProvider>
                    <Tooltip>
                        <div className='w-8 h-8 border-2 rounded-full flex items-center justify-center'>
                            <TooltipTrigger><Eye className='w-6 h-6 stroke-[1.5px]' /></TooltipTrigger>
                        </div>
                        <TooltipContent>
                            <p>Chi tiết</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <div className='bg-amber-500 w-8 h-8 border-2 rounded-full flex items-center justify-center'>
                            <TooltipTrigger><MessageCircleQuestion className='w-6 h-6 stroke-[1.5px]' /></TooltipTrigger>
                        </div>
                        <TooltipContent>
                            <p>Liên hệ shop</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

