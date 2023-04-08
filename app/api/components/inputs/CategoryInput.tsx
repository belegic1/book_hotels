import { StringifyOptions } from 'querystring';
import React from 'react'
import { IconType } from "react-icons";
interface CategoryInputProps{
  label: string;
  selected?: boolean;
  onClick: (value:string) => void;
  icon: IconType
}
const CategoryInput:React.FC<CategoryInputProps> = ({label, onClick, selected , icon:Icon}) => {
  return (
    <div onClick={()=>onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black":"border-neutral-300"}`}
    >
      <Icon size={30} />
      <div className='font-semibold'>
        {label}
      </div>
    </div>
  )
}

export default CategoryInput