import useEmblaCarousel from "embla-carousel-react";

const slides = [
  {
    id: 0,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    title: "Alpine Serenity",
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    title: "Starlit Peaks",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    title: "Valley of Green",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    title: "Emerald Forest",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    title: "Golden Shore",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    title: "Golden Shore",
  },
];

export default function ImageCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  return (
    <div className="bg-zinc-900 py-6 font-[Quicksand,sans-serif] overflow-hidden">
      <div ref={emblaRef} className="overflow-visible">
        <div
          className="flex gap-4"
          style={{ paddingLeft: "10%", paddingRight: "10%" }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="flex-none rounded-xl overflow-hidden"
              style={{ width: "80%" }}
            >
              <img
                src={s.url}
                alt={s.title}
                className="w-full h-72 object-cover block"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
