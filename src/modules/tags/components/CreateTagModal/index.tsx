import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/shared/components/AlertDialog";
import { Input } from "@/shared/components/Input";
import { FC, useState } from "react";
import useTagStore from "../../stores/useTagStore";
import { useCreateTagMutation } from "@/entities/tags/mutations/useCreateTagMutation";
import { useToast } from "@/shared/hooks/use-toast";
import { AxiosError } from "axios";
import { invalidateTagsQuery } from "@/entities/tags/queries/useGetTagsQuery";
import IconPicker from "../IconPicker";

const CreateTagModal: FC = () => {
  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);
  const {
    tagName,
    setTagName,
    selectedIcon,
    setSelectedIcon,
    openCreateTagModal,
    setOpenCreateTagModal,
  } = useTagStore();

  const { mutate: createTag, isPending: isLoadingCreateTag } =
    useCreateTagMutation();

  const onClearModal = () => {
    setOpenCreateTagModal(false);
    setTagName("");
    setSelectedIcon(undefined);
    setError(null);
  };

  const onConfirm = () => {
    createTag(
      {
        title: tagName,
        icon: selectedIcon,
      },
      {
        onSuccess: () => {
          toast({
            title: "Tag created successfully",
            description: "Your tag has been created successfully",
          });
          onClearModal();
          invalidateTagsQuery();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setError(error.response?.data.message);
          }
        },
      }
    );
  };

  return (
    <AlertDialog open={openCreateTagModal}>
      <AlertDialogOverlay onClick={onClearModal} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Tag</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <Input
              placeholder="Enter tag name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              error={error}
              className="h-12"
            />
          </div>
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            loading={isLoadingCreateTag}
            disabled={isLoadingCreateTag || !tagName.trim()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateTagModal;
