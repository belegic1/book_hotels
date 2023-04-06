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
    <div >{label}</div>
  )
}

export default MenuItem