"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  return (
    <Image src={"/images/logo.png"} className="hidden md:block corsor-pointer" alt='logo' height="100" width='100' />
  )
}

export default Logo