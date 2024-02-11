'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router =useRouter();
  return (
    <>
    <div className="flex flex-col justify-around justify-center items-center h-screen">
      <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Prod GPT</h2>
      <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800"
      onClick={()=>router.push('/home')}>Click to go to Home Page</button>
    </div>
    </>
  );
}
