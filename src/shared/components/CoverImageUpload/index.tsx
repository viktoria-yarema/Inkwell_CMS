import { useState, useRef, type ChangeEvent } from "react";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import { ImagePlus, Upload, X, Loader2 } from "lucide-react";

interface CoverImageUploadProps {
  initialImage?: string;
  onImageUpload: (file: File) => Promise<void>;
  onImageRemove?: () => void;
  className?: string;
}

const CoverImageUpload = ({
  initialImage,
  onImageUpload,
  onImageRemove,
  className = "",
}: CoverImageUploadProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      await onImageUpload(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      setImage(initialImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageRemove?.();
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative">
        {image ? (
          <div className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt="Cover image"
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={handleRemoveImage}
                disabled={isUploading}
                className="rounded-full h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="rounded-full h-8 w-8 shadow-md"
              >
                <ImagePlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-[300px] bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-md p-12 text-center"
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-4" />
                <h3 className="font-medium text-lg">Uploading image...</h3>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Upload Cover Image</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Click to browse or drag and drop your image here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 1200 x 630 pixels
                </p>
              </>
            )}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />
      </div>
    </Card>
  );
};

export default CoverImageUpload;
