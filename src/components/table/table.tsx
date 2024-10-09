import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Select,
  SelectItem,
  Pagination
} from "@nextui-org/react";
import React, { useState } from "react";
import { columns, itemsPerPageOptions } from "./data";
import { RenderCell } from "./render-cell";
import { PaginationTable } from "./pagination";
import { IUserModel } from "@/models";

interface Props {
  users: IUserModel[]
}

export const TableWrapper = ({users} : Props) => {
  const [itemsPerPage, setItemsPerPage] = useState<string>(itemsPerPageOptions[0]['key']);

  const {totalPages, currentPage, setCurrentPage, visibleData: visibleUsers} = PaginationTable<IUserModel>({data: users || [], numberOfItems: parseInt(itemsPerPage)})

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value.length === 0) return;
    setItemsPerPage(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={visibleUsers}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  <RenderCell user={item} columnKey={column.uid} />
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Pagination showControls total={totalPages} initialPage={1} page={currentPage} onChange={setCurrentPage} />
        <Select 
          label="Filtrar por página" 
          labelPlacement="outside-left" 
          className="w-48"
          selectedKeys={[itemsPerPage]}
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPageOptions.map((option) => (
            <SelectItem key={option.key}> 
              {option.label} 
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
