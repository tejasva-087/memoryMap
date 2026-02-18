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
    <ul className="grid grid-cols-8 gap-1">
      {images.map((image, i) => (
        <li
          key={i}
          className="h-12 w-12 border border-white-3 dark:border-black-3 rounded-lg overflow-hidden relative"
        >
          <img src={image} alt="Uploaded content" className="brightness-25" />
          <button
            className="absolute top-1 right-1 focus:outline-0 focus:ring focus:ring-primary transition-all duration-300 rounded-sm"
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
