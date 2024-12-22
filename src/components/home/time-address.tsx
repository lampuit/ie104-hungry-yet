import { Clock3, MapPin } from "lucide-react";

export function TimeAndAddress() {
  return (
    <div className="flex w-64 flex-col items-center justify-around gap-3 bg-black bg-opacity-70 px-1 py-3 text-start text-xs font-normal text-white">
      <div className="flex w-full items-center justify-start gap-3 pl-2">
        <Clock3 size={20} />
        <p>
          Thứ hai - Chủ nhật
          <br />
          8:00 AM - 10:00 PM
        </p>
      </div>
      <div className="flex w-full items-center justify-start gap-3 pl-2">
        <MapPin size={20} />
        <p>
          Đường Hàn Thuyên, Khu Phố 6,
          <br />
          Linh Trung, Thủ Đức, TP HCM
        </p>
      </div>
    </div>
  );
}

export const Clock = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6L12 12L18 12"
      stroke="#FEFEFE"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#FEFEFE"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Location = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
      stroke="#FEFEFE"
    />
    <path
      d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"
      fill="#FEFEFE"
      stroke="#FEFEFE"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
