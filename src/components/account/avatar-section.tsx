import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SquarePen } from 'lucide-react';

interface AvatarSectionProps {
    imageUrl: string | undefined;
    shortName: string;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = React.memo(({ imageUrl, shortName, onFileChange }) => {
    return (
        <div className="flex flex-col items-center gap-6 w-1/2 lg:w-1/4">
            <Avatar className="size-32">
                <AvatarImage src={imageUrl} />
                <AvatarFallback className="text-4xl">{shortName}</AvatarFallback>
            </Avatar>
            <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border border-amber-500 rounded-md text-xs md:text-sm text-amber-500 hover:bg-amber-500 hover:bg-opacity-20">
                    <SquarePen className="stroke-amber-500 w-4 h-4" />
                    Thay đổi ảnh
                </div>
            </Label>
            <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
            />
        </div>
    );
});

AvatarSection.displayName = 'AvatarSection';

export default AvatarSection;

