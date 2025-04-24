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
import { InkwellIcon } from "@/entities/tags/type";
import IconPicker from "../IconPicker";
import {
  invalidateTagQuery,
  useGetTagQuery,
} from "@/entities/tags/queries/useGetTagQuery";

const UpdateTagModal: FC = () => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [updatedTagName, setUpdatedTagName] = useState<string>("");
  const [updatedIcon, setUpdatedIcon] = useState<InkwellIcon | undefined>(
    undefined
  );

  const {
    tagName,
    setTagName,
    selectedIcon,
    setSelectedIcon,
    openUpdateTagModal,
    setOpenUpdateTagModal,
    selectedTagId,
  } = useTagStore();

  const { data: tagData } = useGetTagQuery(selectedTagId || undefined);

  useEffect(() => {
    if (tagData) {
      setUpdatedTagName(tagData.title);
      setUpdatedIcon(tagData.icon);
    } else {
      setUpdatedTagName(tagName);
      setUpdatedIcon(selectedIcon);
    }
  }, [tagData, tagName, selectedIcon]);

  const { mutate: updateTag, isPending: isLoadingUpdateTag } =
    useUpdateTagMutation();

  const onClearModal = () => {
    setOpenUpdateTagModal(false);
    setTagName("");
    setSelectedIcon(undefined);
    setUpdatedTagName("");
    setUpdatedIcon(undefined);
    setError(null);
  };

  const onConfirm = () => {
    if (!selectedTagId) return;

    const hasNoChanges =
      updatedTagName === tagName && updatedIcon === selectedIcon;
    if (hasNoChanges) {
      setError("No changes detected");
      return;
    }

    updateTag(
      {
        id: selectedTagId,
        title: updatedTagName,
        icon: updatedIcon,
      },
      {
        onSuccess: () => {
          toast({
            title: "Tag updated successfully",
            description: "Your tag has been updated successfully",
          });
          onClearModal();
          invalidateTagsQuery();
          invalidateTagQuery(selectedTagId);
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
        <div className="flex flex-col space-y-4">
          <div>
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
          </div>
          <IconPicker
            value={updatedIcon}
            onChange={(icon) => {
              setUpdatedIcon(icon);
              if (error) {
                setError(null);
              }
            }}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClearModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            loading={isLoadingUpdateTag}
            disabled={isLoadingUpdateTag || !updatedTagName.trim()}
          >
            Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateTagModal;
