import Image from "next/image";
import Link from "next/link";
type Props = {
  image: string;
  title: string;
  price: number;
  category?: string;
};
export const ProductCard = ({
  image,
  title,
  price,
  // category,
}: Props) => {
  return (
    <Link href={`/${title}`} className="w-40 md:w-56 hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow duration-200">
      <article className="flex flex-col h-full">
        <div className="w-full relative">
        <Image
          src={image}
          alt="product image"
          width={96}
          height={96}
          className="w-96"
          />
          </div>
        <div className="flex flex-col justify-between w-full h-full px-2 pt-6 pb-2">
          <p className="text-sm text-stone-600 uppercase">silver</p>
          <p>{title}</p>
          <p className="text-xl font-medium">{price} kr</p>
        </div>
      </article>
    </Link>
  );
};
