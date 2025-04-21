import cn from "@/shared/utils/cn";
import SignupForm from "./components/SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import Logo from "@/shared/assets/icons/Logo";

const SignupPage = () => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 m-auto max-w-[600px] max-h-[600px] translate-y-1/2 px-6"
      )}
    >
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl"> Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
