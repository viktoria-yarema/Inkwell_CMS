import { Controller, useForm } from "react-hook-form";
import { Form, useNavigate, Link } from "react-router-dom";
import { Input } from "@/shared/components/ui/Input";
import { Label } from "@/shared/components/ui/Label";
import { Button } from "@/shared/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType } from "@/entities/auth/type";
import { loginSchema } from "@/entities/auth/validations";
import { useLoginMutation } from "@/entities/auth/mutations/useLoginMutation";
import { Loader2 } from "lucide-react";
import { ARTICLES_PATH, SIGNUP_PATH } from "@/shared/routes/paths";
import { AxiosError } from "axios";
import useAuthStore from "@/entities/auth/stores/useAuthStore";
import PasswordInput from "@/shared/components/Form/PasswordInput";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAccessToken, setIsAuthenticated } = useAuthStore();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const { mutate: mutateLogin, isPending } = useLoginMutation();

  const onSubmit = async (data: LoginSchemaType) => {
    await mutateLogin(data, {
      onSuccess: (data) => {
        setAccessToken(data.token);
        setIsAuthenticated(true);

        navigate(ARTICLES_PATH);
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          setError("password", { message: error.response?.data.message });
        }
      },
    });
  };

  return (
    <Form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                required
                {...field}
                error={errors.email?.message}
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput field={field} error={errors.password?.message} />
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending} size="lg">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={SIGNUP_PATH} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
