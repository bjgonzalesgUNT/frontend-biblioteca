import { Card, CardFooter, CardBody, Image, Link } from "@nextui-org/react";
import { BookModel } from "@/models";

interface Props {
  book: BookModel;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Link href={book.path}>
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src={book.image_url}
            width={350}
            height={400}
          />
        </CardBody>
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">{book.author.names}</p>
          <small className="text-default-500">{book.published_at}</small>
          <h4 className="text-large font-bold">{book.title}</h4>
        </CardFooter>
      </Card>
    </Link>
  );
};
