import { mediaUrl, type StrapiImage } from '@/lib/strapi';

type GalleryImage = NonNullable<StrapiImage>;

export default function PostGallery({
  images,
  postTitle,
}: {
  images?: GalleryImage[];
  postTitle: string;
}) {
  const gallery = (images ?? [])
    .map((image, index) => ({
      ...image,
      src: mediaUrl(image),
      alt: image.alternativeText?.trim() || `${postTitle} gallery image ${index + 1}`,
    }))
    .filter((image): image is typeof image & { src: string } => Boolean(image.src));

  if (gallery.length === 0) return null;

  return (
    <section className="mt-8" aria-labelledby="post-gallery-heading" data-testid="post-gallery">
      <h2
        id="post-gallery-heading"
        className="font-display text-2xl font-bold tracking-tight text-ink"
      >
        Gallery
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {gallery.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={gallery.length % 2 === 1 && index === 0 ? 'sm:col-span-2' : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="max-h-[40rem] w-full rounded-2xl border border-ink/8 bg-muted/30 object-contain"
            />
            {image.alternativeText?.trim() && (
              <figcaption className="mt-2 text-center text-xs leading-5 text-ink-faint">
                {image.alternativeText}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
