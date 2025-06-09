import { X } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";
import { FC, useEffect, useState } from "react";
import { Label } from "../Label";

type UploadImageProps = {
  isSubmitting: boolean;
  initialPreviewUrl?: string;
  onFieldUpdate: (newValue?: File) => void;
};

const UploadImage: FC<UploadImageProps> = ({
  isSubmitting,
  initialPreviewUrl,
  onFieldUpdate,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPreviewUrl(initialPreviewUrl);
  }, [initialPreviewUrl]);

  const handleFileSelect = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    onFieldUpdate(file);
  };

  const handleImageDelete = () => {
    setPreviewUrl(undefined);
    onFieldUpdate(undefined);
  };
  return (
    <div className="space-y-2">
      <Label htmlFor="upload-image">Upload Image</Label>
      <div className="space-y-2">
        {!previewUrl ? (
          <Input
            id="upload-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileSelect(file);
              }
            }}
            disabled={isSubmitting}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
          />
        ) : (
          <div className="space-y-2">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-[200px] max-h-[100px] object-cover rounded border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={handleImageDelete}
                disabled={isSubmitting}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Delete image</span>
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileSelect(file);
                  }
                }}
                disabled={isSubmitting}
                className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
