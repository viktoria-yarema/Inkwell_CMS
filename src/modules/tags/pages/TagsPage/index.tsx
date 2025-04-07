import { Button } from "@/shared/components/Button";
import { getTagColumns } from "../../columns";
import DataTable from "@/shared/components/DataTable";
import { Plus } from "lucide-react";
import DeleteModal from "@/shared/components/DeleteModal";
import { useDeleteTagMutation } from "@/entities/tags/mutations/useDeleteTagMutation";
import { useGetTagsQuery } from "@/entities/tags/queries/useGetTagsQuery";
import CreateTagModal from "../../components/CreateTagModal";
import useTagStore from "../../stores/useTagStore";
import UpdateTagModal from "../../components/UpdateTagModal";

const TagsPage = () => {
  const {
    setOpenCreateTagModal,
    selectedTagId,
    setSelectedTagId,
    openDeleteTagModal,
    setOpenDeleteTagModal,
    setOpenUpdateTagModal,
    setTagName,
  } = useTagStore();

  const { data: tags } = useGetTagsQuery();
  const { mutate: deleteTag } = useDeleteTagMutation();

  const handleDeleteTag = (id: string) => {
    setSelectedTagId(id);
    setOpenDeleteTagModal(true);
  };

  const handleUpdateTag = (id: string, name: string) => {
    setSelectedTagId(id);
    setTagName(name);
    setOpenUpdateTagModal(true);
  };

  const columns = getTagColumns({ handleDeleteTag, handleUpdateTag });

  return (
    <div className="flex flex-col gap-4 w-full">
      <Button
        className="text-lg font-semibold px-3 fixed top-5 right-6"
        size="lg"
        onClick={() => setOpenCreateTagModal(true)}
      >
        <Plus className="h-4 w-4" />
        Add Tag
      </Button>
      <div className="mt-10">
        <DataTable columns={columns} data={tags ?? []} />
      </div>
      <DeleteModal
        open={openDeleteTagModal}
        onOpenChange={setOpenDeleteTagModal}
        title="Are you sure?"
        description="This will permanently delete your tag and remove your data from our servers."
        onConfirm={() => {
          if (selectedTagId) {
            deleteTag(selectedTagId);
          }
        }}
      />
      <CreateTagModal />
      <UpdateTagModal />
    </div>
  );
};

export default TagsPage;
