/* eslint-disable @next/next/no-img-element */
"use client";

import useFileUpload from "@/lib/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import React from "react";

import { useDropzone } from "react-dropzone";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface AvatarPickerProps {
  src?: string;
  label: string;
  desc: string;
  onAfterUpload: (imageUrl: string) => void;
}

const AvatarPicker = ({
  src,
  label,
  desc,
  onAfterUpload,
}: AvatarPickerProps) => {
  const { uploadFiles, loading } = useFileUpload();

  const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(src);

  const {
    acceptedFiles,
    fileRejections,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop(acceptedFiles, fileRejections, event) {
      const previewUrl = URL.createObjectURL(acceptedFiles[0]);
      setPreviewSrc(previewUrl);
    },
  });

  React.useEffect(() => {
    if (!previewSrc) return;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(previewSrc);
  }, [previewSrc]);

  const handleUpload = async () => {
    const res = await uploadFiles(acceptedFiles);

    if (res && res.length > 0) {
      onAfterUpload(res[0].url);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        loading ? "pointer-events-none opacity-60" : ""
      )}
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative h-24 w-24 border-4 text-center flex items-center justify-center rounded-full transition-colors hover:border-primary hover:bg-primary/20 group",
          isDragActive ? "border-primary bg-primary/20" : ""
        )}
      >
        <input {...getInputProps()} />
        <p className='sr-only'>
          Drag n drop image files here, or click to select files
        </p>

        {previewSrc ? (
          <img
            src={previewSrc}
            alt={acceptedFiles[0]?.name}
            className='absolute inset-0 rounded-full w-full h-full object-cover'
          />
        ) : (
          <ImageIcon className='h-8 w-8 text-border inset-0 transition-colors group-hover:text-primary' />
        )}
      </div>

      <div>
        <FormLabel>{label}</FormLabel>
        <FormDescription>{desc}</FormDescription>
        <Button
          type='button'
          variant='secondary'
          size='sm'
          className='mt-2'
          onClick={handleUpload}
          disabled={!acceptedFiles || acceptedFiles.length === 0}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default AvatarPicker;
