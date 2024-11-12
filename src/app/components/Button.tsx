import React from 'react';

type ButtonProps = {
  onClick: (event: React.FormEvent) => void;
  children: React.ReactNode;
  type: "button" | "submit";
};

const Button: React.FC<ButtonProps> = ({type, onClick, children }) => {
  return (
    <button
      className="button px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;