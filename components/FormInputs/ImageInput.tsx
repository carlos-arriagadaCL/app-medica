import React from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "",
}: {
  label: string;
  imageUrl: string;
  setImageUrl: any;
  className?: string;
  endpoint: any;
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Cambiar imagen</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={`${endpoint}` as any}
          onClientUploadComplete={(res: any) => {
            setImageUrl(res[0].url);
            toast.success("Imagen cargada exitosamente");
          }}
          onUploadError={(error: any) => {
            toast.error("Error al cargar la imagen, inténtalo de nuevo");
          }}
          
        />
      )}
    </div>
  );
}
