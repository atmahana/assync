interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = "text",
  onChange,
  disabled,
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 text-xl font-semibold text-foreground">{label}</p>
      )}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="w-full p-4 text-lg text-foreground transition bg-primary rounded-md outline-none focus:ring-sky-500 focus:ring-2 disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default Input;
