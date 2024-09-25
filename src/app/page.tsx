'use client'
import {getUserFromDB} from '../lib/actions/getUserFormDB'
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={getUserFromDB}>Click me </button>
    </div>
  );
}
