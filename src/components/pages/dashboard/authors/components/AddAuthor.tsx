"use client";

import { UrlIcon } from "@/components/icons";
import { PlusIcon } from "@/components/icons/accounts/plus-icon";
import { AUTHOR_CREATE_SUCCESS_MESSAGE } from "@/constants";
import { addAuthor, useAuthorsDispatch } from "@/context/authors";
import { AuthorFormType } from "@/helpers/form-types/author.form-type";
import { createAuthorSchema } from "@/helpers/schemas/author.schema";
import { AuthorsService } from "@/services";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Formik } from "formik";
import { Fragment, useCallback, useState } from "react";
import { toast } from "sonner";
import { countries, genres } from "../data";

export const AddAuthor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAuthorsDispatch();

  const initialValues: AuthorFormType = {
    surnames: "",
    names: "",
    nationality: "",
    gender: "",
    alias: "",
    image_url: "",
  };

  const handleSubmit = useCallback(
    async (values: AuthorFormType) => {
      setIsLoading(true);
      try {
        const newAuthor = await AuthorsService.create(values);
        dispatch(addAuthor(newAuthor));
        toast.success(AUTHOR_CREATE_SUCCESS_MESSAGE);
        onOpenChange();
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, onOpenChange],
  );

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
              <ModalHeader className="flex flex-col gap-1">
                Agregar Autor
              </ModalHeader>

              <Formik
                initialValues={initialValues}
                validationSchema={createAuthorSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <Fragment>
                    <ModalBody>
                      {/* Apellidos */}
                      <Input
                        label="Apellidos"
                        variant="bordered"
                        isRequired
                        value={values.surnames}
                        onChange={handleChange("surnames")}
                        isInvalid={!!errors.surnames && !!touched.surnames}
                        errorMessage={errors.surnames}
                      />

                      {/* Nombres */}
                      <Input
                        label="Nombres"
                        variant="bordered"
                        isRequired
                        value={values.names}
                        onChange={handleChange("names")}
                        isInvalid={!!errors.names && !!touched.names}
                        errorMessage={errors.names}
                      />

                      {/* Nacionalidad */}
                      <Autocomplete
                        label="Nacionalidad"
                        variant="bordered"
                        isRequired
                        defaultItems={countries}
                        selectedKey={values.nationality}
                        onSelectionChange={(value) => {
                          handleChange({
                            target: { name: "nationality", value },
                          });
                        }}
                        isInvalid={
                          !!errors.nationality && !!touched.nationality
                        }
                        errorMessage={errors.nationality}
                      >
                        {(item) => (
                          <AutocompleteItem key={item.name}>
                            {item.es_name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>

                      {/* Género */}
                      <Autocomplete
                        label="Género"
                        variant="bordered"
                        isRequired
                        defaultItems={genres}
                        selectedKey={values.gender}
                        onSelectionChange={(value) => {
                          handleChange({
                            target: { name: "gender", value },
                          });
                        }}
                        isInvalid={!!errors.gender && !!touched.gender}
                        errorMessage={errors.gender}
                      >
                        {(item) => (
                          <AutocompleteItem key={item.name}>
                            {`${item.name}`}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>

                      {/* Alias */}
                      <Input
                        label="Alias"
                        variant="bordered"
                        isRequired
                        value={values.alias}
                        onChange={handleChange("alias")}
                        isInvalid={!!errors.alias && !!touched.alias}
                        errorMessage={errors.alias}
                      />

                      {/* Image */}
                      <Input
                        label="Imagen"
                        variant="bordered"
                        isRequired
                        startContent={<UrlIcon />}
                        value={values.image_url}
                        onChange={handleChange("image_url")}
                        isInvalid={!!errors.image_url && !!touched.image_url}
                        errorMessage={errors.image_url}
                      />
                    </ModalBody>
                    <ModalFooter>
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
