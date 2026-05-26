"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const normalizedImages = useMemo(() => images.filter((image) => image.length > 0), [images]);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (normalizedImages.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-xl bg-zinc-100 text-sm text-zinc-500">
        Esta oferta não possui imagens.
      </div>
    );
  }

  const selected = normalizedImages[Math.min(currentIndex, normalizedImages.length - 1)];

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative h-72 w-full overflow-hidden rounded-xl">
        <Image src={selected} alt={title} fill unoptimized className="object-cover" />
      </div>

      {normalizedImages.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {normalizedImages.map((image, index) => (
            <li key={`${image}-${index}`}>
              <button
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={[
                  "overflow-hidden rounded-lg border",
                  index === currentIndex ? "border-orange-500" : "border-zinc-200",
                ].join(" ")}
              >
                <div className="relative h-16 w-full">
                  <Image src={image} alt={`${title} ${index + 1}`} fill unoptimized className="object-cover" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
