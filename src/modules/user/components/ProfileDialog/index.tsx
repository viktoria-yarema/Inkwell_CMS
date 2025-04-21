"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/Dialog";
import * as z from "zod";
import profileSchema from "./validations";
import { Mail, Phone, User } from "lucide-react";
import { User as UserType } from "@/entities/user/type";
import { useEffect } from "react";
import { useUpdateUserMutation } from "@/entities/user/mutations/useUpdateUserMutation";
import { useToast } from "@/shared/hooks/use-toast";
import { invalidateUserQuery } from "@/entities/user/queries/useUserQuery";

type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileDialogProps = {
  user?: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ProfileDialog = ({ open, setOpen, user }: ProfileDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
  });
  const { mutate: updateUser } = useUpdateUserMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (user && open) {
      setValue("firstName", user?.firstName ?? "");
      setValue("lastName", user?.lastName ?? "");
      setValue("phoneNumber", user?.phoneNumber ?? "");
      setValue("email", user?.email ?? "");
    }
  }, [user, open]);

  const onSubmit = (data: ProfileFormData) => {
    updateUser(data, {
      onSuccess: () => {
        setOpen(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated",
        });
        invalidateUserQuery();
      },
      onError: (error) => {
        console.error(error);
        setError("root", {
          message: "Something went wrong",
        });
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const hasErrors =
    !!errors.firstName ||
    !!errors.lastName ||
    !!errors.phoneNumber ||
    !!errors.email;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] min-h-[600px] flex flex-col gap-2">
        <DialogHeader className="flex flex-col gap-2 h-auto">
          <DialogTitle className="text-2xl font-bold">
            Profile Information
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <div className="grid gap-6 py-4">
            <div className="flex flex-col gap-4">
              <p className="text-md flex items-center gap-2 text-secondary/70">
                General Information
              </p>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="firstName"
                  className="text-xs flex items-center gap-2"
                >
                  <User size={14} />
                  First Name
                </Label>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      {...field}
                      error={errors.firstName?.message}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="lastName"
                  className="text-xs flex items-center gap-2"
                >
                  <User size={16} />
                  Last Name
                </Label>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      {...field}
                      error={errors.lastName?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-md flex items-center gap-2 text-secondary/70">
                Contact Information
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-xs flex items-center gap-2"
                  >
                    <Phone size={14} />
                    Phone
                  </Label>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <Input
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        {...field}
                        error={errors.phoneNumber?.message}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="email"
                    className="text-xs flex items-center gap-2"
                  >
                    <Mail size={14} />
                    Email
                  </Label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        error={errors.email?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
        </form>
        <DialogFooter className="flex justify-end absolute bottom-4 left-4 right-4">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            size="lg"
            disabled={hasErrors}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
