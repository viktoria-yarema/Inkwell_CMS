import { User as UserType } from "@/entities/user/type";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/Avatar";
import { getAvatarInitials } from "@/shared/utils/getAvatarInitials";
import { CircleUserRound } from "lucide-react";

type UserAvatarProps = {
  user?: UserType;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const hasAvatarImage = !!user?.avatarUrl;
  const canShowFullName = !!user?.firstName && !!user?.lastName;

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      {hasAvatarImage && (
        <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
      )}
      {canShowFullName && (
        <AvatarFallback className="rounded-lg">
          {getAvatarInitials(user.firstName, user.lastName)}
        </AvatarFallback>
      )}
      {!canShowFullName && !hasAvatarImage && (
        <AvatarFallback className="rounded-lg">
          <CircleUserRound />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
