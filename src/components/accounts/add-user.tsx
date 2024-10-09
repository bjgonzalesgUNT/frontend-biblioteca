import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem
} from "@nextui-org/react";
import React from "react";
import { PlusIcon } from "../icons/accounts/plus-icon";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary" startContent={<PlusIcon/>}>
          Crear
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Usuario
                </ModalHeader>
                <ModalBody>
                  <Input isRequired label="Nombre" variant="bordered" />
                  <Select isRequired label="Rol" variant="bordered">
                    <SelectItem key="administrador" value="administrador"> Administrador </SelectItem>
                    <SelectItem key="trabajador" value="trabajador"> Trabajador  </SelectItem>
                  </Select>
                  <Select isRequired label="Estado" variant="bordered">
                    <SelectItem key="habilitado" value="habilitado"> Habilitado </SelectItem>
                    <SelectItem key="deshabilitado" value="deshabilitado"> Deshabilitado </SelectItem>
                  </Select>
                  <Input isRequired label="Correo" variant="bordered" />
                  <Input isRequired label="Contraseña" type="password" variant="bordered" />
                  <Input 
                    isRequired
                    label="Confirmar Contraseña"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Agregar
                  </Button>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
