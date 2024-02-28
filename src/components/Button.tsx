import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => {
  const buttonClasses = `border border-gray-500 rounded w-full ${className}`;
  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
