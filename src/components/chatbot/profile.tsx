import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserIcon as Male,
  UserIcon as Female,
  User,
} from "lucide-react";

export default function ProfileCard({
  name,
  phone,
  address,
  email,
  imageUrl,
  birthday,
  gender,
}: {
  name: string;
  phone: string;
  address: string;
  email: string;
  imageUrl: string;
  birthday: Date;
  gender: "Nam" | "Nữ" | "Khác";
}) {
  const getGenderIcon = (gender: any) => {
    switch (gender) {
      case "Nam":
        return <Male className="h-5 w-5 text-blue-500" aria-hidden="true" />;
      case "Nữ":
        return <Female className="h-5 w-5 text-pink-500" aria-hidden="true" />;
      case "Khác":
        return <User className="h-5 w-5 text-purple-500" aria-hidden="true" />;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-2xl font-bold">{name}</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ProfileItem
            icon={<Phone className="text-muted-foreground" />}
            label="Số Điện Thoại"
          >
            {phone}
          </ProfileItem>
          <ProfileItem
            icon={<MapPin className="text-muted-foreground" />}
            label="Địa Chỉ"
          >
            {address}
          </ProfileItem>
          <ProfileItem
            icon={<Mail className="text-muted-foreground" />}
            label="Email"
          >
            <a
              href={`mailto:${email}`}
              className="text-primary hover:underline"
            >
              {email}
            </a>
          </ProfileItem>
          <ProfileItem
            icon={<Calendar className="text-muted-foreground" />}
            label="Sinh Nhật"
          >
            {new Date(birthday).toLocaleDateString("vi-VN")}
          </ProfileItem>
          <ProfileItem icon={getGenderIcon(gender)} label="Giới Thiệu">
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </ProfileItem>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileItem({
  icon,
  label,
  children,
}: React.PropsWithChildren<{ icon: React.ReactNode; label: string }>) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  );
}
