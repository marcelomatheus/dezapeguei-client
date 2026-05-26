"use client";

import Image from "next/image";
import { ChangeEvent, useMemo } from "react";

type ImageUploadProps = {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
};

export function ImageUpload({ value, onChange, maxFiles = 5 }: ImageUploadProps) {
  const previews = useMemo(
    () => value.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    [value],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, maxFiles);
    onChange(files);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-800">Imagens</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-300 p-2 text-sm"
      />

      {previews.length > 0 ? (
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-5">
          {previews.map((preview) => (
            <li key={preview.name} className="relative h-20 overflow-hidden rounded-md border border-zinc-200">
              <Image src={preview.url} alt={preview.name} fill unoptimized className="object-cover" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
