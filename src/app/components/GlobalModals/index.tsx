import useUserQuery from "@/entities/user/queries/useUserQuery";
import { useProfileStore } from "@/entities/user/stores/useProfileModal";
import ProfileDialog from "@/modules/user/components/ProfileDialog";

const GlobalModals = () => {
  const { open, setOpen } = useProfileStore();
  const { data: user } = useUserQuery();

  return <ProfileDialog open={open} setOpen={setOpen} user={user} />;
};

export default GlobalModals;
