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
import { FC, useEffect, useState } from "react";
import useTagStore from "../../stores/useTagStore";
import { useUpdateTagMutation } from "@/entities/tags/mutations/useUpdateTagMutation";
import { invalidateTagsQuery } from "@/entities/tags/queries/useGetTagsQuery";
import { useToast } from "@/shared/hooks/use-toast";
import { AxiosError } from "axios";

const UpdateTagModal: FC = () => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [updatedTagName, setUpdatedTagName] = useState<string>("");

  const {
    tagName,
    setTagName,
    openUpdateTagModal,
    setOpenUpdateTagModal,
    selectedTagId,
  } = useTagStore();

  useEffect(() => {
    setUpdatedTagName(tagName);
  }, [tagName]);

  const { mutate: updateTag, isPending: isLoadingUpdateTag } =
    useUpdateTagMutation();

  const onClearModal = () => {
    setOpenUpdateTagModal(false);
    setTagName("");
    setUpdatedTagName("");
    setError(null);
  };

  const onConfirm = () => {
    if (!selectedTagId) return;

    if (updatedTagName === tagName) {
      setError("Tag name is the same");
      return;
    }

    updateTag(
      { id: selectedTagId, title: updatedTagName },
      {
        onSuccess: () => {
          toast({
            title: "Tag updated successfully",
            description: "Your tag has been updated successfully",
          });
          onClearModal();
          //TODO: make optimistic updates
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
    <AlertDialog open={openUpdateTagModal}>
      <AlertDialogOverlay onClick={onClearModal} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Tag</AlertDialogTitle>
        </AlertDialogHeader>
        <Input
          placeholder="Enter tag name"
          value={updatedTagName}
          onChange={(e) => {
            setUpdatedTagName(e.target.value);
            if (error) {
              setError(null);
            }
          }}
          error={error}
          className="h-12"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            loading={isLoadingUpdateTag}
            disabled={isLoadingUpdateTag}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateTagModal;
