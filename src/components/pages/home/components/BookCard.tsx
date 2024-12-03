import { Card, CardFooter, CardBody, Image, Link } from "@nextui-org/react";
import { BookModel } from "@/models";

interface Props {
  book: BookModel;
  customHeight?: number;
  customWidth?: number;
}

export const BookCard = ({
  book,
  customHeight = 400,
  customWidth = 350,
}: Props) => {
  return (
    <Link href={book.path}>
      <Card className="bg-gray-200 py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src={book.image_url}
            width={customWidth}
            height={customHeight}
          />
        </CardBody>
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2 text-black">
          <p className="text-tiny font-bold uppercase">{book.author.names}</p>
          <small className="text-default-200">{book.published_at}</small>
          <h4 className="text-base font-bold xl:text-large">{book.title}</h4>
        </CardFooter>
      </Card>
    </Link>
  );
};
