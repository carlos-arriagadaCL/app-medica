import React from "react";
import { XCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadDropzone } from "@/utils/uploadthing";

type MultipleImageInputProps = {
  label: string;
  imageUrls: string[];
  setImageUrls: any;
  className?: string;
  endpoint?: any;
};

export default function MultipleImageInput({
  label,
  imageUrls,
  setImageUrls,
  className = "col-span-full",
  endpoint = "",
}: MultipleImageInputProps) {
  function handleImageRemove(imageIndex: any) {
    const updatedImages = imageUrls.filter(
      (image, index) => index !== imageIndex
    );
    setImageUrls(updatedImages);
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl, i) => {
            return (
              <div key={i} className="relative mb-6">
                <button
                  onClick={() => handleImageRemove(i)}
                  className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
                >
                  <XCircle className="" />
                </button>
                <Image
                  src={imageUrl}
                  alt="Item image"
                  width={1000}
                  height={667}
                  className="w-full h-32 object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const urls = res.map((item) => item.url);
            setImageUrls(urls);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            toast.error("Image Upload Failed, Try Again");
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
