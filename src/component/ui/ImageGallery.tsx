import { XIcon } from "@phosphor-icons/react";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
};

function ImageGallery({ images }: ImageGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const columns: { src: string; index: number }[][] = [[], [], []];
  images.forEach((src, index) => {
    columns[index % 3].push({ src, index });
  });

  return (
    <>
      <div className="flex gap-2 items-start w-full mt-4 px-1">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2 flex-1">
            {col.map(({ src, index }) => (
              <div
                key={index}
                onClick={() => setLightbox(src)}
                className="group relative rounded-md overflow-hidden cursor-zoom-in bg-white-1 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out"
              >
                <img
                  src={src}
                  alt={`Trip photo ${index + 1}`}
                  className="w-full block object-cover group-hover:brightness-90 transition-all duration-300"
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black-1/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                  <span className="text-white-1/70 text-[11px] font-light italic tracking-wide">
                    {index + 1} / {images.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-6 w-9 h-9 text-2xl text-white-1/80 rounded-full bg-black-3/80 transition-colors duration-300 flex items-center justify-center"
          >
            <XIcon />
          </button>
          <img
            src={lightbox}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[min(90vw,860px)] max-h-[90vh] rounded-2xl object-contain shadow-2xl cursor-default"
          />
        </div>
      )}
    </>
  );
}

export default ImageGallery;
