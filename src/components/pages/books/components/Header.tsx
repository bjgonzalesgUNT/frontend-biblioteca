import { Select, SelectItem } from "@nextui-org/react";
import { filtrado } from "./data";
import { Card, CardBody } from "@nextui-org/react";

export const Header = () => {
  return (
    <header className="mb-4 flex w-full flex-col">
      <h1 className="flex justify-center text-2xl font-bold">
        COLECCIÓN DISPONIBLE
      </h1>
      <div className="flex items-center justify-between p-2">
        <Card>
          <CardBody>
            <p>Libros 1-12 de 10,000</p>
          </CardBody>
        </Card>
        <Select label="Seleccionar orden" className="max-w-xs">
          {filtrado.map((filtro) => (
            <SelectItem key={filtro}>{filtro}</SelectItem>
          ))}
        </Select>
      </div>
    </header>
  );
};
