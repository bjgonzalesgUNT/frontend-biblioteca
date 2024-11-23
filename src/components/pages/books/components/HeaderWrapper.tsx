import { Select, SelectItem } from "@nextui-org/react";
import { filters } from "./data";
import { TSort } from "../types";

interface Props {
  page: number;
  count: number;
  total: number;
  setSelectedSortOption: (sort: TSort) => void;
}

export const HeaderWrapper = ({
  count,
  page,
  total,
  setSelectedSortOption,
}: Props) => {
  return (
    <div className="mb-4 flex w-full flex-col">
      <h1 className="flex justify-center text-3xl font-bold">
        LIBROS DISPONIBLES
      </h1>
      <div className="flex items-center justify-between p-2">
        <span className="text-sm text-default-400">
          Mostrando
          <span className="mx-1">
            {(page - 1) * 10 + count} de {total}
          </span>
          resultados
        </span>
        <div>
          <Select
            label="Seleccionar orden"
            labelPlacement="outside-left"
            size="sm"
            variant="underlined"
            disallowEmptySelection
            items={filters}
            defaultSelectedKeys={["ASC" as TSort]}
            onSelectionChange={({ currentKey }) =>
              setSelectedSortOption(currentKey as TSort)
            }
            className="w-40"
          >
            {(item) => <SelectItem key={item.key}>{item.filter}</SelectItem>}
          </Select>
        </div>
      </div>
    </div>
  );
};
