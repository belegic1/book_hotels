"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem:React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return (
    <div className="p-1 ml-1 hover:bg-rose-500 hover:text-white" onClick={onClick} >{label}</div>
  )
}

export default MenuItem