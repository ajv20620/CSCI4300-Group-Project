import Image from "next/image";
import Button from "./Button";

interface HeaderProps {
  buttons: {
    label: string;
    onClick: (event: React.FormEvent) => void;
  }[];
}

export default function Header({ buttons }: HeaderProps) {
  return (
    <div className="relative z-20">
      <nav className="flex justify-around space-x-4 items-center bg-blue-500 h-24 p-5 border-b-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <h1 className="font-serif font-bold text-3xl">Librium</h1>
          <Image
            className=""
            src="/bookIcon.png"
            alt="bookIcon"
            width={40}
            height={40}
          />
        </div>
        
        <div className="flex space-x-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              type="button"
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}
