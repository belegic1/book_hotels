"use client";

import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import tw from "tailwind-styled-components";
const ButtonContainer = tw.div`relative hover:opacity-80 transition cursor-pointer`

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const hasFavorite = false;
  const toggleFavorite = ()=>{}
  return (
    <ButtonContainer onClick={toggleFavorite}>
      <AiOutlineHeart size={28} className="absolute fill-white -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasFavorite ? 'fill-rose-500': "fill-neutral-500/70"} />
    </ButtonContainer>
  )
}

export default HeartButton