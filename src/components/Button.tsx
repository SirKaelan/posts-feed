type ButtonProps = {
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
  className?: string;
  children: string;
};

export const Button = ({
  type = "button",
  handleClick,
  className = "",
  children,
}: ButtonProps) => {
  const btnClasses =
    `py-1 px-2 text-gray-800 border border-gray-400 rounded transition hover:bg-blue-500 hover:text-white ${className}`.trim();

  return (
    <button type={type} onClick={handleClick} className={btnClasses}>
      {children}
    </button>
  );
};
