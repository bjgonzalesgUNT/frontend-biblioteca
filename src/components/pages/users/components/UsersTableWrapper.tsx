import { IUserModel } from "@/models";
import { Table } from "@nextui-org/react";

interface Props {
  users: IUserModel[];
}

export const UsersTableWrapper = () => {
  return (
    <Table aria-label="Example table with custom cells">
      {/* <TableHeader columns={columns}>
      {(column) => (
        <TableColumn key={column.uid}>{column.name}</TableColumn>
      )}
    </TableHeader> */}
      {/* <TableBody items={visibleUsers}>
      {(item) => (
        <TableRow key={item.id}>
          {columns.map((column) => (
            <TableCell key={column.uid}>
              <RenderCell user={item} columnKey={column.uid} />
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableBody> */}
    </Table>
  );
};
