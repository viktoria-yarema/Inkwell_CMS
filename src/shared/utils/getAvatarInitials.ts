export const getAvatarInitials = (fullName: string): string => {
  return fullName
    .split(" ")
    .map((n) => n[0])
    .join("");
};
