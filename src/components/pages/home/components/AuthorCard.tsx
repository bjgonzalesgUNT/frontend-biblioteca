import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";
import { AuthorModel } from "@/models";
import Link from "next/link";

interface Props {
  author: AuthorModel;
}

export const AuthorCard = ({ author }: Props) => {
  return (
    <Link
      href={{
        pathname: "/books",
        query: { filter: author.alias },
      }}
    >
      <Card className="bg-gray-200 py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src={author.image_url}
            width={350}
            height={400}
          />
        </CardBody>
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2 text-black">
          <p className="text-tiny font-bold uppercase">
            {author.surnames}, {author.names}
          </p>
          <small className="text-default-200">{author.nationality}</small>
          <h4 className="text-large font-bold">{author.alias}</h4>
        </CardFooter>
      </Card>
    </Link>
  );
};
