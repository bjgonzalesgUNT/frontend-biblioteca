"use client";

import { EditIcon } from "@/components/icons/table/edit-icon";
import { PUBLISHER_UPDATE_SUCCESS_MESSAGE } from "@/constants";
import { updatePublisher, usePublishersDispatch } from "@/context/publishers";
import { PublisherFormType } from "@/helpers/form-types/publisher.form-type";
import { createPublisherSchema } from "@/helpers/schemas/publisher.schema";
import { PublisherModel } from "@/models";
import { PublishersService } from "@/services";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface Props {
  publisher: PublisherModel;
}

export const EditPublisher = ({ publisher }: Props) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  const [haveChanges, setHaveChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = usePublishersDispatch();

  const initialValues: PublisherFormType = {
    name: publisher.name,
  };

  const handleValidate = (values: PublisherFormType) => {
    const haveChanges = Object.entries(initialValues).some(
      ([key, value]) => value !== values[key as keyof PublisherFormType],
    );
    setHaveChanges(haveChanges);
  };

  const handleSubmit = async (values: PublisherFormType) => {
    setIsLoading(true);
    try {
      const publisherUpdated = await PublishersService.update(
        publisher.id,
        values,
      );
      dispatch(updatePublisher(publisherUpdated));
      setHaveChanges(false);
      toast.success(PUBLISHER_UPDATE_SUCCESS_MESSAGE);
      onOpenChange();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Tooltip content="Editar editorial" color="warning">
        <Button
          isIconOnly
          color="warning"
          aria-label="editar editorial"
          onPress={onOpen}
        >
          <EditIcon fill="black" />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <Formik
              initialValues={initialValues}
              validationSchema={createPublisherSchema}
              onSubmit={handleSubmit}
              validate={handleValidate}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
                <Fragment>
                  <ModalHeader className="flex flex-col gap-1">
                    <p className="w-full text-center text-xl font-bold uppercase md:text-2xl">
                      Editar editoral
                      <span className="ml-2 text-orange-500">
                        {publisher.name}
                      </span>
                    </p>
                  </ModalHeader>
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
                  <ModalFooter className="flex justify-between gap-2">
                    <Button color="danger" onPress={onClose}>
                      Cancelar
                    </Button>
                    <div className="space-x-2">
                      <Button
                        color="secondary"
                        variant="ghost"
                        isDisabled={!haveChanges}
                        onPress={() => {
                          setHaveChanges(false);
                          return handleReset();
                        }}
                      >
                        Reestablecer
                      </Button>
                      <Button
                        color="primary"
                        variant="shadow"
                        isLoading={isLoading}
                        isDisabled={!haveChanges}
                        onPress={() => handleSubmit()}
                      >
                        Actualizar
                      </Button>
                    </div>
                  </ModalFooter>
                </Fragment>
              )}
            </Formik>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
