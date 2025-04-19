export const getAvatarInitials = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName[0]}${lastName[0]}`;
};
