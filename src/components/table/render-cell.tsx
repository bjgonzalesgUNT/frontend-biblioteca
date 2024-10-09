import { User, Tooltip, Chip, useDisclosure, Switch } from "@nextui-org/react";
import { useRef, useState } from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IUserModel } from "@/models";
import { PopUpDetailsUser, PopUpEditUser } from "../accounts/pop-up-user";

interface Props {
  user: IUserModel;
  columnKey: string;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const { isOpen: isDetailsOpen, onOpen: onOpenDetails, onOpenChange: onOpenChangeDetails } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();

  const cellValue = user[columnKey as keyof IUserModel];
  

  switch (columnKey) {
    case "name":
      return (
        <User avatarProps={{src: user['avatar']}} name={cellValue} />
      );
    case "email":
      return (
        <div>
          <span>{cellValue}</span>
        </div>
      );
    case "status":
      const [isSwitchOn, setIsSwitchOn] = useState(user.status === "habilitado");

      const switchRef = useRef(user.status === "habilitado");
      console.log(switchRef);

      const handleSwitchToggle = () => {
        setIsSwitchOn(!isSwitchOn);
        switchRef.current = !switchRef.current;
        console.log(`Usuario ${user.name} ha cambiado a estado: ${switchRef.current ? 'habilitado' : 'deshabilitado'}`)
      };

      return (
        <Switch 
          isSelected={isSwitchOn}
          onValueChange={handleSwitchToggle}
        />
      )

    case "actions":
      return (
        <>
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Detalles">
              <button onClick={onOpenDetails} className="bg-zinc-700 p-2 rounded-xl">
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Editar usuario" color="secondary" >
              <button onClick={onOpenEdit} className="bg-zinc-700 p-2 rounded-xl">
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          {/* <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log("Delete user", user.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div> */}
        </div>

        <PopUpDetailsUser user={user} isOpen={isDetailsOpen} onOpenChange={onOpenChangeDetails} />
        <PopUpEditUser user={user} isOpen={isEditOpen} onOpenChange={onOpenChangeEdit} />
        </>
      );
    default:
      return cellValue;
  }
};
