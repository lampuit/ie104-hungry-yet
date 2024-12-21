export default function LoginPrompt() {
    return (
        <div className="flex justify-center items-center h-[4/5] w-4/5">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center max-w-md mx-auto">
                <strong className="font-bold">Thông báo: </strong>
                <span className="block sm:inline">Vui lòng đăng nhập để biết thêm thông tin !!!</span>
            </div>
        </div>
    );
}