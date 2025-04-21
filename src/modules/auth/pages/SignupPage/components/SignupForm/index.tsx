import { Controller, useForm } from "react-hook-form";
import { Form, useNavigate, Link } from "react-router-dom";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { Button } from "@/shared/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchemaType } from "@/entities/auth/type";
import { signupSchema } from "@/entities/auth/validations";
import { useSignupMutation } from "@/entities/auth/mutations/useSignupMutation";
import { Loader2 } from "lucide-react";
import { ARTICLES_PATH, LOGIN_PATH } from "@/shared/routes/paths";
import { AxiosError } from "axios";
import useAuthStore from "@/entities/auth/stores/useAuthStore";
import PasswordInput from "@/shared/components/Form/PasswordInput";

const SignupForm = () => {
  const navigate = useNavigate();
  const { setAccessToken, setIsAuthenticated } = useAuthStore();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signupSchema),
  });

  const { mutate: mutateSignup, isPending } = useSignupMutation();

  const onSubmit = async (data: SignupSchemaType) => {
    await mutateSignup(data, {
      onSuccess: (data) => {
        setAccessToken(data.token);
        setIsAuthenticated(true);

        navigate(ARTICLES_PATH);
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          setError("email", { message: error.response?.data.message });
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput field={field} error={errors.password?.message} />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending} size="lg">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to={LOGIN_PATH} className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </Form>
  );
};

export default SignupForm;
