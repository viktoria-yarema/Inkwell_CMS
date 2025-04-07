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

const CreateTagModal: FC = () => {
  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);
  const { tagName, setTagName, openCreateTagModal, setOpenCreateTagModal } =
    useTagStore();
  const { mutate: createTag, isPending: isLoadingCreateTag } =
    useCreateTagMutation();

  const onClearModal = () => {
    setOpenCreateTagModal(false);
    setTagName("");
    setError(null);
  };

  const onConfirm = () => {
    createTag(
      { title: tagName },
      {
        onSuccess: () => {
          toast({
            title: "Tag created successfully",
            description: "Your tag has been created successfully",
          });
          onClearModal();
          //TODO: make optimistic updates, update from query cache
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
        <div className="w-full">
          <Input
            placeholder="Enter tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            error={error}
            className="h-12"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            loading={isLoadingCreateTag}
            disabled={isLoadingCreateTag}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateTagModal;
