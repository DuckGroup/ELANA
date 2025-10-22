import Image from "next/image";
type Props = {
    image: string
    title: string
    price: number
    category?: string
}
export const ProductCard = ({image, title, price, category}: Props) => {
  return (
    <article className="flex flex-col items-center py-4 min-w-36">
      <Image
        src={image}
        alt="product image"
        className="w-full"
        width={96}
        height={96}
      />
      <div className="flex flex-col items-start w-full px-2 py-4">
        <p className="text-sm text-stone-600">{category}</p>
        <p>{title}</p>
        <p className="text-lg font-medium">{price} kr</p>
      </div>
    </article>
  );
};
