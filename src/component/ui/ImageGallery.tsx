import { useEffect, useState } from "react";

type Prop = {
  images: string[];
  countryName: string;
};

function ImageGallery({ images, countryName }: Prop) {
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMainImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mainImage, images.length]);

  return (
    <>
      <img
        src={images[mainImage]}
        alt={`User's memory of ${countryName}`}
        className="w-full h-100 object-contain"
      />
      <ul className="grid grid-cols-6 gap-2">
        {images.map((image, i) => (
          <li>
            <img
              src={image}
              alt={`User's memory of ${countryName}`}
              key={i}
              className={
                i === mainImage
                  ? "rounded-lg h-12 w-full object-contain border-2 border-primary"
                  : "rounded-lg h-12 w-full object-contain"
              }
              onClick={() => setMainImage(i)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ImageGallery;
