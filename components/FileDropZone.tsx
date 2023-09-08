/* eslint-disable @next/next/no-img-element */
"use client";

import { cn, removeDuplicates } from "@/lib/utils";
import React from "react";

import { useDropzone } from "react-dropzone";
import { useList } from "@uidotdev/usehooks";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import useFileUpload from "@/lib/hooks/useFileUpload";

interface FileItem {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FileDropZoneProps {
  fileData?: FileItem[];
  onSave: (fileData: FileItem[]) => void;
  onRemoveExisting: (index: number) => void;
  maxItems?: number;
}

function FileDropZone({
  fileData,
  onSave,
  onRemoveExisting,
  maxItems = 4,
}: FileDropZoneProps) {
  const [files, filesMethods] = useList<FileItem>([]);

  const { uploadFiles, loading } = useFileUpload();

  const {
    acceptedFiles,
    fileRejections,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: maxItems,
    accept: {
      "image/*": [],
    },

    onDrop: (acceptedFiles) => {
      const filesToAppend = acceptedFiles.map((file) => {
        return {
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
          type: "image",
        };
      });

      // avoid duplicates
      if (fileData) {
        filesMethods.set(
          removeDuplicates([...files, ...fileData, ...filesToAppend], "name")
        );
      } else {
        filesMethods.set(
          removeDuplicates([...files, ...filesToAppend], "name")
        );
      }
    },
  });

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.url));
  }, [files]);

  const handleUpload = async () => {
    const uniqueFilesFromCurrent = new Set(fileData?.map((f) => f.name));

    const toBeUploaded = acceptedFiles.filter(
      (f) => !uniqueFilesFromCurrent.has(f.name)
    );

    const uploadedFiles = await uploadFiles(toBeUploaded);

    if (uploadedFiles) {
      if (fileData) {
        const unique = removeDuplicates(uploadedFiles.concat(fileData), "name");
        onSave(unique);
      } else {
        onSave(uploadedFiles);
      }
    }

    filesMethods.clear();
  };
  console.log({ fileData });

  const currentTotal = fileData ? fileData.length + files.length : files.length;

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "py-10 border border-dashed text-center rounded transition-colors hover:border-primary hover:bg-primary/20",
          isDragActive ? "border-primary bg-primary/20" : "",
          maxItems === currentTotal ? "pointer-events-none opacity-60" : ""
        )}
      >
        <input {...getInputProps()} />
        <p>Drag n drop image files here, or click to select files</p>
        <em className='text-sm text-muted-foreground'>(Maximum of 4 images)</em>
      </div>

      {fileRejections.length >= maxItems ? (
        <Alert className='mt-6 border border-amber-600 text-amber-600 bg-amber-600/10'>
          <AlertTitle>
            <ExclamationTriangleIcon className='h-4 w-4 inline mr-2' />
            Too many files
          </AlertTitle>
          <AlertDescription>
            Kindly upload a maximum of {maxItems} files only.
          </AlertDescription>
        </Alert>
      ) : null}

      <ul className='mt-6 space-y-2'>
        {fileData?.map((file, index) => (
          <li key={file.name}>
            <ImageListItem
              fileItem={file}
              onRemove={() => onRemoveExisting(index)}
            />
          </li>
        ))}
        {files.map((file, index) => (
          <li key={file.name}>
            <ImageListItem
              fileItem={file}
              onRemove={() => filesMethods.removeAt(index)}
            />
          </li>
        ))}
      </ul>

      <div className='space-x-4 pt-4 flex justify-end'>
        <Button
          type='button'
          variant='ghost'
          size='lg'
          className='shadow-none'
          onClick={filesMethods.clear}
          disabled={loading}
        >
          Clear
        </Button>
        <Button
          type='button'
          size='lg'
          className='shadow-none'
          disabled={files.length === 0 || loading}
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}

export default FileDropZone;

interface ImageListItemProps {
  fileItem: FileItem;
  onRemove: () => void;
}

const ImageListItem = ({ fileItem, onRemove }: ImageListItemProps) => {
  return (
    <div className='flex items-center gap-4 border rounded pr-4'>
      <img
        className='w-20 h-20 object-cover'
        src={fileItem.url}
        alt={fileItem.name}
        onLoad={() => {
          URL.revokeObjectURL(fileItem.url);
        }}
      />
      <div className='p-4 space-y-3'>
        <h6 className='text-sm font-medium'>{fileItem.name}</h6>
        <p className='text-xs text-muted-foreground'>{fileItem.size}</p>
      </div>
      <div className='ml-auto'>
        <Button variant='ghost' size='icon' onClick={onRemove}>
          <span className='sr-only'>remove file</span>
          <Cross2Icon className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};
