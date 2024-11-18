import { Card, CardFooter, CardBody, Image, Link } from "@nextui-org/react";
import { AuthorModel } from "@/models";

interface Props {
  author: AuthorModel;
}

export const AuthorCard = ({ author }: Props) => {
  return (
    <Link href="/link-a-todos-los-libros-del-autor">
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src={author.image_url}
            width={350}
            height={400}
          />
        </CardBody>
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">
            {author.surnames}, {author.names}
          </p>
          <small className="text-default-500">{author.nationality}</small>
          <h4 className="text-large font-bold">{author.alias}</h4>
        </CardFooter>
      </Card>
    </Link>
  );
};
