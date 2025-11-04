import Link from "next/link";

type Props = {
  buttonType: "click" | "link";
  name: string;
  color: "primary" | "secondary" | "white";
  textColor?: "white" | "black";
  route?: string;
  onClick?: () => void;
};

export const Button = ({
  name,
  color,
  route,
  buttonType,
  onClick,
  textColor = "black",
}: Props) => {
  const bgColors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    white: "bg-white",
  };

  const textColors = {
    white: "text-white",
    black: "text-black",
  };

  const className = `${bgColors[color]} ${textColors[textColor]} hover:bg-gray-200 py-2 px-4 border-b-[3px] border-r-[3px] transition-all duration-200`;

  if (buttonType === "link" && route) {
    return (
      <Link href={route} className={className}>
        {name}
        
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {name}
    </button>
  );
};
