import { BookModel } from "@/models";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";

interface Props {
  book: BookModel;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Link href={`/books/${book.id}`} className="flex size-full justify-center">
      <Card className="h-full py-4">
        <CardBody className="overflow-visible py-0">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src={book.image_url}
            width={350}
            height={300}
          />
        </CardBody>
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">{book.author.alias}</p>
          <small className="text-default-500">{book.deway.description}</small>
          <h4 className="text-large font-bold">{book.title}</h4>
        </CardFooter>
      </Card>
       
    </Link>
  );
};
