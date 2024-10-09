import { IUserModel } from "@/models";
import { Switch, User } from "@nextui-org/react";

interface Props {
  user: IUserModel;
  columnKey: string;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore

  const cellValue = user[columnKey as keyof IUserModel];

  switch (columnKey) {
    case "name":
      return <User avatarProps={{ src: user["avatar"] }} name={cellValue} />;
    case "email":
      return (
        <div>
          <span>{cellValue}</span>
        </div>
      );
    case "status":
      <Switch />;

    case "actions":
      return null;
    // <>
    //   <div className="flex items-center gap-4">
    //     <div>
    //       <Tooltip content="Detalles">
    //         <button
    //           onClick={onOpenDetails}
    //           className="rounded-xl bg-zinc-700 p-2"
    //         >
    //           <EyeIcon size={20} fill="#979797" />
    //         </button>
    //       </Tooltip>
    //     </div>
    //     <div>
    //       <Tooltip content="Editar usuario" color="secondary">
    //         <button
    //           onClick={onOpenEdit}
    //           className="rounded-xl bg-zinc-700 p-2"
    //         >
    //           <EditIcon size={20} fill="#979797" />
    //         </button>
    //       </Tooltip>
    //     </div>
    //     {/* <div>
    //     <Tooltip
    //       content="Delete user"
    //       color="danger"
    //       onClick={() => console.log("Delete user", user.id)}
    //     >
    //       <button>
    //         <DeleteIcon size={20} fill="#FF0080" />
    //       </button>
    //     </Tooltip>
    //   </div> */}
    //   </div>

    //   <PopUpDetailsUser
    //     user={user}
    //     isOpen={isDetailsOpen}
    //     onOpenChange={onOpenChangeDetails}
    //   />
    //   <PopUpEditUser
    //     user={user}
    //     isOpen={isEditOpen}
    //     onOpenChange={onOpenChangeEdit}
    //   />
    // </>
    default:
      return cellValue;
  }
};
