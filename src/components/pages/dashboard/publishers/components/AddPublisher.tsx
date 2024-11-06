"use client";

import { PlusIcon } from "@/components/icons/accounts/plus-icon";
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
import { Fragment, useCallback, useState } from "react";
import { Formik } from "formik";
import { PublisherFormType } from "@/helpers/form-types/publisher.form-type";
import { createPublisherSchema } from "@/helpers/schemas/publisher.schema";
import { toast } from "sonner";
import { PUBLISHER_CREATE_SUCCESS_MESSAGE } from "@/constants";
import { PublishersService } from "@/services";

export const AddPublisher = () => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: PublisherFormType = {
    name: "",
  };
  const handleSubmit = useCallback(
    async (values: PublisherFormType) => {
      setIsLoading(true);
      try {
        const publisher = await PublishersService.create(values);
        toast.success(PUBLISHER_CREATE_SUCCESS_MESSAGE);
        onOpenChange();
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    },
    [onOpenChange],
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
                Agregar Editorial
              </ModalHeader>
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
                        label="Agregar"
                        variant="bordered"
                        isRequired
                        value={values.name}
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
