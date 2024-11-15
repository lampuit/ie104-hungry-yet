
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const CardOrderInfo = () => {
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
            <div className='flex flex-col gap-4 p-4 justify-center'>
                <Button variant={"outline"} className='w-40 text-lg'>Xem chi tiết</Button>
                <Button className='w-40 text-lg bg-amber-500'>Liên hệ shop</Button>
            </div>
        </div>
    )
}