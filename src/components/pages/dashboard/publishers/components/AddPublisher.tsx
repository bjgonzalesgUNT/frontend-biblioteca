"use client";

import { PlusIcon } from "@/components/icons/accounts/plus-icon";
import { PUBLISHER_CREATE_SUCCESS_MESSAGE } from "@/constants";
import { addPublisher, usePublishersDispatch } from "@/context/publishers";
import { PublisherFormType } from "@/helpers/form-types/publisher.form-type";
import { createPublisherSchema } from "@/helpers/schemas/publisher.schema";
import { PublishersService } from "@/services";
import {
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
import { Fragment, useState } from "react";
import { toast } from "sonner";

export const AddPublisher = () => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = usePublishersDispatch();

  const initialValues: PublisherFormType = {
    name: "",
  };

  const handleSubmit = async (values: PublisherFormType) => {
    setIsLoading(true);
    try {
      const publisher = await PublishersService.create(values);
      dispatch(addPublisher(publisher));
      toast.success(PUBLISHER_CREATE_SUCCESS_MESSAGE);
      onOpenChange();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              <ModalHeader>Agregar Editorial</ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={createPublisherSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <Fragment>
                    <ModalBody>
                      {/* Nombre de la editorial */}
                      <Input
                        label="Nombre"
                        variant="bordered"
                        isRequired
                        value={values.name.toUpperCase()}
                        onChange={handleChange("name")}
                        isInvalid={!!errors.name && !!touched.name}
                        errorMessage={errors.name}
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
