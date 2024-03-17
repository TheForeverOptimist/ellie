import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <header className="flex justify-between fixed w-full top-0 text-white ">
          <Image alt='Logo' src="https://i.imgur.com/MCHWJZS.png" height={50} width={50} className="object-contain" />

          <SettingsIcon size={40} className="p-2 m-2 rounded-full cursor-pointer bg-blue-500 text-black transition-all ease-in-out duration-150 hover:bg-blue-700 hover:text-white" />
        </header>

        

      </MaxWidthWrapper>
    </>
  );
}
