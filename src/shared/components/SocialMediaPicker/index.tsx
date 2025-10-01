"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { SocialMediaLink } from "@/entities/user/type";
import { X, Plus, ExternalLink } from "lucide-react";

// Social media platform configurations
const SOCIAL_MEDIA_PLATFORMS = [
  { id: "facebook", name: "Facebook", icon: "📘", color: "#1877F2" },
  { id: "instagram", name: "Instagram", icon: "📷", color: "#E4405F" },
  { id: "twitter", name: "Twitter", icon: "🐦", color: "#1DA1F2" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "#0077B5" },
  { id: "youtube", name: "YouTube", icon: "📺", color: "#FF0000" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "#000000" },
  { id: "snapchat", name: "Snapchat", icon: "👻", color: "#FFFC00" },
  { id: "pinterest", name: "Pinterest", icon: "📌", color: "#BD081C" },
  { id: "reddit", name: "Reddit", icon: "🤖", color: "#FF4500" },
  { id: "discord", name: "Discord", icon: "💬", color: "#5865F2" },
  { id: "telegram", name: "Telegram", icon: "✈️", color: "#0088CC" },
  { id: "whatsapp", name: "WhatsApp", icon: "💬", color: "#25D366" },
  { id: "github", name: "GitHub", icon: "🐙", color: "#333333" },
  { id: "gitlab", name: "GitLab", icon: "🦊", color: "#FCA326" },
  { id: "behance", name: "Behance", icon: "🎨", color: "#1769FF" },
  { id: "dribbble", name: "Dribbble", icon: "🏀", color: "#EA4C89" },
  { id: "medium", name: "Medium", icon: "📝", color: "#00AB6C" },
  { id: "dev", name: "Dev.to", icon: "👨‍💻", color: "#0A0A0A" },
  { id: "hashnode", name: "Hashnode", icon: "🌐", color: "#2962FF" },
  { id: "twitch", name: "Twitch", icon: "🎮", color: "#9146FF" },
  { id: "spotify", name: "Spotify", icon: "🎵", color: "#1DB954" },
  { id: "soundcloud", name: "SoundCloud", icon: "🎶", color: "#FF5500" },
  { id: "vimeo", name: "Vimeo", icon: "🎬", color: "#1AB7EA" },
  { id: "flickr", name: "Flickr", icon: "📸", color: "#0063DC" },
  { id: "tumblr", name: "Tumblr", icon: "📝", color: "#001935" },
];

type SocialMediaPickerProps = {
  socialMedia: SocialMediaLink[];
  onAdd: (social: SocialMediaLink) => void;
  onUpdate: (id: string, link: string) => void;
  onRemove: (id: string) => void;
};

export const SocialMediaPicker = ({
  socialMedia,
  onAdd,
  onUpdate,
  onRemove,
}: SocialMediaPickerProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [link, setLink] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState("");

  const availablePlatforms = SOCIAL_MEDIA_PLATFORMS.filter(
    (platform) => !socialMedia.some((social) => social.id === platform.id)
  );

  const handleAdd = () => {
    if (selectedPlatform && link) {
      onAdd({ id: selectedPlatform, link });
      setSelectedPlatform("");
      setLink("");
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && editingLink) {
      onUpdate(editingId, editingLink);
      setEditingId(null);
      setEditingLink("");
    }
  };

  const startEdit = (id: string, currentLink: string) => {
    setEditingId(id);
    setEditingLink(currentLink);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingLink("");
  };

  const getPlatformInfo = (id: string) => {
    return SOCIAL_MEDIA_PLATFORMS.find((platform) => platform.id === id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Social Media Links</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
          disabled={availablePlatforms.length === 0}
        >
          <Plus size={16} className="mr-2" />
          Add Social Media
        </Button>
      </div>

      {socialMedia.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No social media links added yet.</p>
          <p className="text-sm">Click "Add Social Media" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {socialMedia.map((social) => {
            const platform = getPlatformInfo(social.id);
            const isEditing = editingId === social.id;

            return (
              <div
                key={social.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
              >
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{platform?.icon}</span>
                      <span className="font-medium">{platform?.name}</span>
                    </div>
                    <Input
                      value={editingLink}
                      onChange={(e) => setEditingLink(e.target.value)}
                      placeholder="Enter link"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleUpdate}
                      disabled={!editingLink}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{platform?.icon}</span>
                      <div>
                        <div className="font-medium">{platform?.name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <ExternalLink size={12} />
                          <a
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline truncate max-w-[200px]"
                          >
                            {social.link}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(social.id, social.link)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onRemove(social.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Social Media Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Social Media Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a platform</option>
                {availablePlatforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.icon} {platform.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              disabled={!selectedPlatform || !link}
            >
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
