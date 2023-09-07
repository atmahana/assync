interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? "w-full" : "w-fit"}
        ${secondary ? "bg-foreground" : "bg-accent"}
        ${secondary ? "text-background" : "text-white"}
        ${secondary ? "border-foreground" : "border-accent"}
        ${large ? "text-xl" : "text-md"}
        ${large ? "px-5" : "px-4"}
        ${large ? "py-3" : "py-2"}
        ${outline ? "bg-transparent" : ""}
        ${outline ? "border-primary" : ""}
        ${outline ? "text-primary" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
