import { useRef, type ChangeEvent } from "react";

import { convertToBase64 } from "../../../services/image";

import ImageGrid from "./ImageGrid";

type ImageUploaderProps = {
  id: string;
  label: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  error?: boolean;
};

function ImageInput({
  setImages,
  id,
  label,
  images,
  error,
}: ImageUploaderProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const base64Promises = files.map((file) => convertToBase64(file));
    if (inputEl.current) {
      inputEl.current.value = "";
    }

    try {
      const base64Images = (await Promise.all(base64Promises)) as string[];
      setImages((prev) => [...prev, ...base64Images]);
    } catch (error) {
      console.error(error);
    }
  };

  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    inputEl.current?.click();
  }

  const btnClass = error
    ? `p-4 w-full rounded-xl cursor-pointer focus:outline-none focus:ring focus:ring-red-200 transition-all duration-300 mb-2 border border-red-500`
    : `p-4 w-full rounded-xl cursor-pointer focus:outline-none focus:ring focus:ring-primary transition-all duration-300 mb-2 border border-zinc-200 dark:border-zinc-700`;

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
      <button type="button" onClick={handleBtnClick} className={btnClass}>
        {label}
      </button>
      {/* {images && <ImageGrid images={images} setImages={setState} />} */}
      {images && <ImageGrid images={images} setImages={setImages} />}
    </div>
  );
}

export default ImageInput;
