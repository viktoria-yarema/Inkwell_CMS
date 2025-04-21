import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input, InputProps } from "../../Input";
import { ControllerRenderProps } from "react-hook-form";

type PasswordInputProps = InputProps & {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    "password"
  >;
};

const PasswordInput = ({ field }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        required
        {...field}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
