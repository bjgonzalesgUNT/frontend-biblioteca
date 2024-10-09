import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Avatar,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { IUserModel } from "@/models";

interface Props {
  user: IUserModel;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const PopUpDetailsUser = ({ user, isOpen, onOpenChange }: Props) => {
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detalles del Usuario
              </ModalHeader>
              <ModalBody>
                <div className="mb-4 flex justify-center">
                  <Avatar src={user.avatar} className="h-32 w-32 text-large" />
                </div>
                <Input
                  label="Nombre"
                  variant="bordered"
                  value={user.name}
                  readOnly
                />
                <Input
                  label="Rol"
                  variant="bordered"
                  value={user.role}
                  readOnly
                />
                <Input
                  label="Estado"
                  variant="bordered"
                  value={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  readOnly
                />
                <Input
                  label="Correo"
                  variant="bordered"
                  value={user.email}
                  readOnly
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export const PopUpEditUser = ({ user, isOpen, onOpenChange }: Props) => {
  const [editableUser, setEditableUser] = useState<IUserModel>(user);

  const handleChange = (key: string, value: string) => {
    setEditableUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Usuario
              </ModalHeader>
              <ModalBody>
                <div className="mb-4 flex justify-center">
                  <Avatar
                    src={editableUser.avatar}
                    className="h-32 w-32 text-large"
                  />
                </div>
                <Input
                  label="Nombre"
                  variant="bordered"
                  name="name"
                  value={editableUser.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                  label="Rol"
                  variant="bordered"
                  name="role"
                  value={editableUser.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
                <Select
                  label="Estado"
                  variant="bordered"
                  selectedKeys={[editableUser.status]}
                  onSelectionChange={(keys) => handleChange("status", keys.currentKey as string)}
                >
                  <SelectItem key="habilitado" value="habilitado"> Habilitado </SelectItem>
                  <SelectItem key="deshabilitado" value="deshabilitado"> Deshabilitado </SelectItem>
                </Select>
                {/* <Input label="Estado" variant="bordered" name="status" value={editableUser.status} onChange={handleInputChange} /> */}
                <Input
                  label="Correo"
                  variant="bordered"
                  name="email"
                  value={editableUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onClick={onClose}>
                  Guardar
                </Button>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
