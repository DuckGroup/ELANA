import Image from "next/image";
import Link from "next/link";
type Props = {
  image: string;
  title: string;
  price: number;
  category?: string | null;
};
export const ProductCard = ({ image, title, price, category }: Props) => {
  return (
    <Link
      href={`/${encodeURIComponent(title)}`}
      className="w-40 md:w-56 hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow duration-200"
    >
      <article className="flex flex-col h-full">
        <div className="w-full relative aspect-square bg-secondary/40">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 160px, 224px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between w-full h-full px-2 pt-6 pb-2">
          <p className="text-sm text-stone-600 uppercase">{category || "elana"}</p>
          <p>{title}</p>
          <p className="text-xl font-medium">{price} kr</p>
        </div>
      </article>
    </Link>
  );
};
