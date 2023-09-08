/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import React from "react";

import { useDropzone } from "react-dropzone";
import { useList } from "@uidotdev/usehooks";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FileWithPreview extends File {
  preview: string;
}

interface FileItem {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FileDropZoneProps {
  fileData?: FileItem[];
  onSave: (fileData: FileItem[]) => void;
  maxItems?: number;
}

function FileDropZone({ fileData, maxItems = 4 }: FileDropZoneProps) {
  const [files, filesMethods] = useList<FileWithPreview>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: maxItems,
      accept: {
        "image/*": [],
      },
      onDragEnter: () => {
        setIsDragging(true);
      },
      onDragLeave: () => {
        setIsDragging(false);
      },
      onDrop: (acceptedFiles) => {
        const filesToAppend = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        filesMethods.set([...files, ...filesToAppend]);

        setIsDragging(false);
      },
    });

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "py-10 border border-dashed text-center rounded transition-colors hover:border-primary hover:bg-primary/20",
          isDragging ? "border-primary bg-primary/20" : "",
          files.length > 0 && maxItems === files.length
            ? "pointer-events-none opacity-60"
            : ""
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
        {files.map((file, index) => (
          <li key={file.name}>
            <div className='flex items-center gap-4 border rounded pr-4'>
              <img
                className='w-20 h-20 object-cover'
                src={file.preview}
                alt={file.name}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
              <div className='p-4 space-y-3'>
                <h6 className='text-sm font-medium'>{file.name}</h6>
                <p className='text-xs text-muted-foreground'>{file.size}</p>
              </div>
              <div className='ml-auto'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => filesMethods.removeAt(index)}
                >
                  <span className='sr-only'>remove file</span>
                  <Cross2Icon className='h-5 w-5' />
                </Button>
              </div>
            </div>
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
        >
          Clear
        </Button>
        <Button
          type='button'
          size='lg'
          className='shadow-none'
          disabled={files.length === 0}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default FileDropZone;
