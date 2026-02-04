import { type MouseEvent } from "react";
import { X } from "@phosphor-icons/react";

type Props = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

function ImageGrid({ images, setImages }: Props) {
  function handleBtnClick(e: MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();

    setImages((images) => images.filter((_, i) => i != index));
  }

  return (
    <ul className="flex gap-2">
      {images.map((image, i) => (
        <li
          key={i}
          className="w-12 h-12 border border-zinc-400 rounded-lg overflow-hidden relative"
        >
          <img src={image} alt="Uploaded content" />
          <button
            className="absolute top-1 right-1"
            onClick={(e) => handleBtnClick(e, i)}
          >
            <X />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ImageGrid;
