import {
  RadioGroup,
  Radio,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { categoriasdebusqueda } from "./data";

export default function Sidebar() {
  return (
    <div className="w-1/6 space-y-6 p-4">
      {/* Búsqueda */}
      <Card className="max-w-[240px]">
        <CardHeader>
          <h2 className="text-lg font-bold">BÚSQUEDA</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <RadioGroup label="Seleccionar categorías">
            <Radio value="Título">Título</Radio>
            <Radio value="Autor">Autor</Radio>
            <Radio value="Tema">Tema</Radio>
            <Radio value="Editorial">Editorial</Radio>
          </RadioGroup>
        </CardBody>
        <CardFooter>
          <Input
            type="text"
            placeholder="Buscar"
            labelPlacement="outside"
            endContent={<SearchIcon />}
          />
        </CardFooter>
      </Card>

      {/* Filtros */}
      <Card className="max-w-[240px]">
        <CardHeader>
          <h2 className="text-lg font-bold">FILTRAR</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <RadioGroup label="Filtrar por año">
            <Radio value="5">Últimos 5 años</Radio>
            <Radio value="10">Últimos 10 años</Radio>
            <Radio value="all">Todos los años</Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      {/* Categorías */}
      <Card className="max-w-[240px]">
        <CardHeader>
          <h2 className="text-lg font-bold">CATEGORÍAS</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {categoriasdebusqueda.map((category, index) => (
            <Link key={index} isBlock showAnchorIcon href="#" color="primary">
              {category}
            </Link>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
