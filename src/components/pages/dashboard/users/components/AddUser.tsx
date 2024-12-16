"use client";

import { PlusIcon } from "@/components/icons/accounts/plus-icon";
import { USER_CREATE_SUCCESS_MESSAGE } from "@/constants";
import { addUser } from "@/context/users";
import { UserFormType } from "@/helpers/form-types";
import { createUserSchema } from "@/helpers/schemas";
import { RoleModel } from "@/models";
import { AuthService, PeopleService, RolesService } from "@/services";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Formik } from "formik";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [roles, setRoles] = useState<RoleModel[]>([]);

  const initialValues: UserFormType = {
    surnames: "",
    names: "",
    document: "",
    gender: "",
    nacionality: "",
    telephone: "",
    address: "",
    role_id: "",
  };

  const handleRoles = useCallback(async () => {
    try {
      const roles = await RolesService.getRoles();
      setRoles(roles);
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  const handleSubmit = useCallback(
    async (values: UserFormType) => {
      setIsLoading(true);
      try {
        const { role_id, ...rest } = values;

        const newPerson = await PeopleService.createOne(rest);

        const newUser = await AuthService.signUp({
          username: newPerson.document,
          password: newPerson.document,
          person_id: newPerson.id,
          role_id,
        });

        dispatch(addUser(newUser));
        toast.success(USER_CREATE_SUCCESS_MESSAGE);
        onOpenChange();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, onOpenChange],
  );

  useEffect(() => {
    handleRoles();
  }, [handleRoles]);

  return (
    <div>
      <Button onPress={onOpen} color="primary" startContent={<PlusIcon />}>
        Crear
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader>Agregar Usuario</ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={createUserSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <Fragment>
                    <ModalBody>
                      <div className="flex w-full flex-col gap-4">
                        <Input
                          label="Apellidos"
                          variant="bordered"
                          isRequired
                          value={values.surnames}
                          onChange={handleChange("surnames")}
                          isInvalid={!!errors.surnames && !!touched.surnames}
                          errorMessage={errors.surnames}
                        />
                        <Input
                          label="Nombres"
                          variant="bordered"
                          isRequired
                          value={values.names}
                          onChange={handleChange("names")}
                          isInvalid={!!errors.names && !!touched.names}
                          errorMessage={errors.names}
                        />
                        <Input
                          label="Documento"
                          variant="bordered"
                          type="number"
                          isRequired
                          value={values.document}
                          onChange={handleChange("document")}
                          isInvalid={!!errors.document && !!touched.document}
                          errorMessage={errors.document}
                        />
                        <Select
                          label="Genero"
                          variant="bordered"
                          isRequired
                          value={values.gender}
                          onChange={handleChange("gender")}
                          isInvalid={!!errors.gender && !!touched.gender}
                          errorMessage={errors.gender}
                        >
                          <SelectItem key="M">Masculino</SelectItem>
                          <SelectItem key="F">Femenio</SelectItem>
                        </Select>
                        <Select
                          variant="bordered"
                          label="Pais"
                          isRequired
                          value={values.nacionality}
                          onChange={handleChange("nacionality")}
                          isInvalid={
                            !!errors.nacionality && !!touched.nacionality
                          }
                          errorMessage={errors.nacionality}
                        >
                          <SelectItem
                            key="ar"
                            startContent={
                              <Avatar
                                alt="Argentina"
                                className="h-6 w-6"
                                src="https://flagcdn.com/ar.svg"
                              />
                            }
                          >
                            Argentina
                          </SelectItem>
                          <SelectItem
                            key="pe"
                            startContent={
                              <Avatar
                                alt="Peru"
                                className="h-6 w-6"
                                src="https://flagcdn.com/pe.svg"
                              />
                            }
                          >
                            Peru
                          </SelectItem>
                          <SelectItem
                            key="ve"
                            startContent={
                              <Avatar
                                alt="Venezuela"
                                className="h-6 w-6"
                                src="https://flagcdn.com/ve.svg"
                              />
                            }
                          >
                            Venezuela
                          </SelectItem>
                        </Select>
                        <Input
                          label="Telefono"
                          variant="bordered"
                          type="number"
                          value={values.telephone}
                          onChange={handleChange("telephone")}
                          isInvalid={!!errors.telephone && !!touched.telephone}
                          errorMessage={errors.telephone}
                        />
                        <Input
                          label="Direccion"
                          variant="bordered"
                          value={values.address}
                          onChange={handleChange("address")}
                          isInvalid={!!errors.address && !!touched.address}
                          errorMessage={errors.address}
                        />
                        <Select
                          variant="bordered"
                          label="Rol"
                          isRequired
                          value={values.role_id}
                          onChange={handleChange("role_id")}
                          isInvalid={!!errors.role_id && !!touched.role_id}
                          errorMessage={errors.role_id}
                        >
                          {roles.map((role) => (
                            <SelectItem key={role.id}>{role.name}</SelectItem>
                          ))}
                        </Select>
                      </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-between gap-4">
                      <Button color="danger" variant="flat" onClick={onClose}>
                        Cerrar
                      </Button>
                      <Button
                        color="primary"
                        isLoading={isLoading}
                        onPress={() => handleSubmit()}
                      >
                        Agregar
                      </Button>
                    </ModalFooter>
                  </Fragment>
                )}
              </Formik>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
