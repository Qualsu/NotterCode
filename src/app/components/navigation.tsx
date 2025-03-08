import Image from 'next/image';
import React from 'react';
import Logo from "../../../public/NotterCode.png"

export function Navigation({ width, setWidth }: { width: number, setWidth: (width: number) => void }) {
    const handleMouseDown = (e: React.MouseEvent) => {
        const startX = e.clientX;
        const initialWidth = width;

        const handleMouseMove = (e: MouseEvent) => {
            const newWidth = initialWidth + (e.clientX - startX);
            if (newWidth >= 200 && newWidth <= 300) {
                setWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="flex select-none">
            <nav
                className="bg-zinc-950 flex justify-center items-center flex-col"
                style={{ width }}
            >
                <Image src={Logo} alt="" width={100}/>
                <h1 className="text-white/10 font-bold">Develop...</h1>
            </nav>
            <div
                className="resizer cursor-col-resize hover:bg-zinc-900 duration-150 ease-i"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}