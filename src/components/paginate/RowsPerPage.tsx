import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

interface Props {
  limit: number;
  total: number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const RowsPerPage = ({ onChange, limit, total }: Props) => {
  return (
    <Select
      className="max-w-xs"
      labelPlacement="outside-left"
      label="Filas por pagina"
      defaultSelectedKeys={[limit.toString()]}
      onChange={onChange}
    >
      {Array.from({ length: Math.ceil(total / 10) }).map((_, i) => {
        const key = (i + 1) * 10;
        const value = (i + 1) * 10;
        return (
          <SelectItem key={key} value={value}>
            {`${value} filas`}
          </SelectItem>
        );
      })}
    </Select>
  );
};
