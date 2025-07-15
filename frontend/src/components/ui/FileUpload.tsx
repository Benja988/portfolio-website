import { ChangeEvent } from 'react';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  accept?: string;
  label?: string;
}

export const FileUpload = ({ onChange, accept = 'image/*', label = 'Upload a file' }: FileUploadProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] || null);
  };

  return (
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
      <div className="space-y-1 text-center">
        <div className="flex text-sm text-gray-600 dark:text-gray-300">
          <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
            <span>{label}</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="sr-only"
              accept={accept}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG, GIF up to 5MB
        </p>
      </div>
    </div>
  );
};