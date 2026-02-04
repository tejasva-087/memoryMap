import { useRef, type ChangeEvent } from "react";
import { convertToBase64 } from "../../../services/image";
import ImageGrid from "../../form/imageGrid";

type ImageUploaderProps = {
  id: string;
  label: string;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
};

function ImageUploader({ setState, id, label, images }: ImageUploaderProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    const base64Promises = files.map((file) => convertToBase64(file));

    try {
      const base64Images = (await Promise.all(base64Promises)) as string[];
      setState((prev) => [...prev, ...base64Images]);
    } catch (error) {
      console.error(error);
    }
  };

  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    inputEl.current?.click();
  }

  return (
    <div>
      <input
        ref={inputEl}
        type="file"
        id={id}
        name={id}
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleBtnClick}
        className="border border-zinc-200 dark:border-zinc-700 p-4 w-full rounded-xl cursor-pointer ocus:outline-none focus:ring focus:ring-primary transition-all duration-300 mb-4"
      >
        {label}
      </button>
      {images && <ImageGrid images={images} setImages={setState} />}
    </div>
  );
}

export default ImageUploader;
