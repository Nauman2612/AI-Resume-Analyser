import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";
interface FileSelectProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileSelectProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const ActualFile = acceptedFiles[0] || null;
      setFile(ActualFile);
      onFileSelect?.(ActualFile);
    },
    [onFileSelect],
  );

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize: maxFileSize,
      accept: { "application/pdf": [".pdf"] },
    });
  return (
    <div className=" w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          <div className="mx-auto w-16 h-16 flex justify-center items-center">
            <img
              src="Icons/warning.svg"
              alt="warning icon"
              className="size-20"
            />
          </div>
          <div>
            {file ? (
              <div
                className="uploader-selected-file"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="Images/resume-scan-2.gif"
                  alt="file icon"
                  className="size-10"
                />
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-lg text-gray-700">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  className="rounded-full p-2 hover:bg-red-100 hover:text-red-500 transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    setFile(null);
                    onFileSelect?.(null);
                  }}
                >
                  <img src="Icons/pin.svg" alt="delete" className="size-4" />
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-500">
                  <span className="font-semi-bold"> Click to Upload</span>
                  or drag and drop the file
                </p>
                <p className="text-sm text-gray-500">
                  PDF (Max {formatSize(maxFileSize)})
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
