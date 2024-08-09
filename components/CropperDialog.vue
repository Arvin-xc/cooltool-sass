<script setup lang="tsx">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// import "react-image-crop/dist/ReactCrop.css";
// import { FileWithPreview } from "@/app/page";
// import { CropIcon, Trash2Icon } from "lucide-react";

interface ImageCropperProps {
  dialogOpen: boolean;
  selectedFile: string | null;
}

const { dialogOpen, selectedFile } = defineProps<ImageCropperProps>();
const aspect = 1;

const imgRef = ref<HTMLImageElement | null>(null);

const crop = ref();
const croppedImageUrl = ref<string>("");
const croppedImage = ref<string>("");

function getCroppedImg(image: HTMLImageElement, crop: any): string {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }

  return canvas.toDataURL("image/png", 1.0);
}
const onCrop = () => {};
</script>

<template>
  <Dialog :open="dialogOpen" onOpenChange="{setDialogOpen}">
    <DialogTrigger>
      <Avatar
        class="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
      >
        <AvatarImage
          :src="croppedImage ? croppedImage : selectedFile || ''"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DialogTrigger>
    <DialogContent class="p-0 gap-0">
      <div class="p-6 size-full">
        <!-- <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => onCropComplete(c)}
            aspect={aspect}
            class="w-full"
          >
            <Avatar class="size-full rounded-none">
              <AvatarImage
                ref={imgRef}
                class="size-full rounded-none "
                alt="Image Cropper Shell"
                src={selectedFile?.preview}
                onLoad={onImageLoad}
              />
              <AvatarFallback class="size-full min-h-[460px] rounded-none">
                Loading...
              </AvatarFallback>
            </Avatar>
          </ReactCrop> -->
      </div>
      <DialogFooter class="p-6 pt-0 justify-center">
        <DialogClose asChild>
          <Button
            size="sm"
            type="reset"
            class="w-fit"
            variant="outline"
            @click="
              () => {
                // setSelectedFile(null);
              }
            "
          >
            <Trash2Icon class="mr-1.5 size-4" />
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" size="sm" class="w-fit" @onClick="onCrop">
          <!-- <CropIcon class="mr-1.5 size-4" /> -->
          Crop
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
