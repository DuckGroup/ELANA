import Link from "next/link";

type Props = {
  buttonType: "click" | "link";
  name: string;
  color: "red" | "beige";
  textColor?: "white" | "black";
  route?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({ name, color, route, buttonType, disabled, onClick, textColor }: Props) => {
  const className =
      color === "red"
      ? `bg-[#A8333E] hover:bg-[#8F2C35] text-${textColor}  py-2 px-4 border-[#8F2C35] border-b-[3px] border-r-[3px] transition-all duration-200 ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`
      : color === "beige"
      ? `bg-[#F4E9D8] hover:bg-[#E8DBC4] text-${textColor} py-2 px-4 border-[#E8DBC4] border-b-[3px] border-r-[3px] transition-all duration-200 ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`
      : `bg-white hover:bg-gray-200 text-${textColor}  py-2 px-4 border-gray-200 border-b-[3px] border-r-[3px] transition-all duration-200 ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`;
  if (buttonType === "link" && route) {
      return (
          <Link href={route} className={className}>
              {name}
          </Link>
      );
  } else {
      return (
          <button onClick={onClick} className={className} disabled={disabled}>
              {name}
          </button>
      );
  }
};