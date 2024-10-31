
export function Benefit() {
    return (
        <div className="flex flex-row justify-center align-center gap-16">
            <div className="flex flex-col justify-around items-center text-center h-56">
                <Circle1 />
                <h2 className="font-semibold text-2xl">Bla Bla 1</h2>
                <p className="font-normal text-xs">Lorem ipsum dolor sit amet<br />adipisicing elit. Officiis</p>
            </div>
            <Line />
            <div className="flex flex-col justify-around items-center text-center h-56">
                <Circle2 />
                <h2 className="font-semibold text-2xl">Bla Bla 1</h2>
                <p className="font-normal text-xs">Lorem ipsum dolor sit amet<br />adipisicing elit. Officiis</p>
            </div>
            <Line />
            <div className="flex flex-col justify-around items-center text-center h-56">
                <Circle3 />
                <h2 className="font-semibold text-2xl">Bla Bla 1</h2>
                <p className="font-normal text-xs">Lorem ipsum dolor sit amet<br />adipisicing elit. Officiis</p>
            </div>
        </div>
    )
}

export const Circle1 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50.0011" r="50" fill="#E3793F" />
    </svg>
)

export const Circle2 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50.0011" r="50" fill="#F1C964" />
    </svg>
)

export const Circle3 = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50.0011" r="50" fill="#99BD76" />
    </svg>
)

export const Line = () => (
    <svg width="3" height="220" viewBox="0 0 3 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1.5" x2="1.5" y2="220.002" stroke="#D5D5D5" strokeWidth="2" />
    </svg>
)
