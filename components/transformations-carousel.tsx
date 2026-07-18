const photos = [
  '/fotos/antes-despues/612957351_18214619911313204_1618623237597770932_n.jpg',
  '/fotos/antes-despues/612993751_18214619956313204_903278202248967903_n.jpg',
  '/fotos/antes-despues/613694786_18214619893313204_8169459907329592000_n.jpg',
  '/fotos/antes-despues/613731654_18214619935313204_7589048451935062303_n.jpg',
  '/fotos/antes-despues/615591625_18214619926313204_669693108835031132_n.jpg',
  '/fotos/antes-despues/615620060_18214619848313204_5872948659734776354_n.jpg',
  '/fotos/antes-despues/615779035_18214619881313204_7531928590567302489_n.jpg',
  '/fotos/antes-despues/615828089_18214619971313204_6624922572585003150_n.jpg',
  '/fotos/antes-despues/616057727_18214619959313204_1660996497523379655_n.jpg',
  '/fotos/antes-despues/616507156_18214619863313204_2702869590221448763_n.jpg',
  '/fotos/antes-despues/616893851_18214619968313204_2497801326412857411_n.jpg',
  '/fotos/antes-despues/transformacion-1.jpg',
  '/fotos/antes-despues/transformacion-2.jpg',
  '/fotos/antes-despues/transformacion-3.jpg',
  '/fotos/antes-despues/transformacion-4.jpg',
];

export function TransformationsCarousel() {
  // The list is rendered twice so the -50% translation loops seamlessly.
  const loop = [...photos, ...photos];

  return (
    <div className="relative mt-14 overflow-hidden">
      {/* Side fades so the photos melt into the black background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-28" />

      <div className="marquee-track">
        {loop.map((src, index) => (
          <figure
            key={`${src}-${index}`}
            className="relative mr-4 aspect-square w-[260px] shrink-0 overflow-hidden rounded-3xl border border-white/10 sm:w-[320px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Transformación antes y después de un miembro Crow"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <figcaption>
              <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
                Antes
              </span>
              <span className="absolute bottom-3 right-3 rounded-full bg-brand/90 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
                Después
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
