import { UrlIcon } from "@/components/icons";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { AUTHOR_UPDATE_SUCCESS_MESSAGE } from "@/constants";
import { updateAuthor, useAuthorsDispatch } from "@/context/authors";
import { UpdateAuthorFormType } from "@/helpers/form-types/author.form-type";
import { updateAuthorSchema } from "@/helpers/schemas";
import { AuthorModel } from "@/models";
import { AuthorsService } from "@/services";
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
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  author: AuthorModel;
}

export const EditAuthor = ({ author }: Props) => {
  const [haveChanges, setHaveChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useAuthorsDispatch();

  const initialValues: UpdateAuthorFormType = {
    image_url: author.image_url || "",
  };

  const handleSubmit = async (values: UpdateAuthorFormType) => {
    setIsLoading(true);
    try {
      const authorUpdated = await AuthorsService.update(author.id, values);
      toast.success(AUTHOR_UPDATE_SUCCESS_MESSAGE);
      dispatch(updateAuthor(authorUpdated));
      onOpenChange();
      setHaveChanges(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChanges = (values: UpdateAuthorFormType) => {
    const haveChanges = Object.entries(initialValues).some(
      ([key, value]) => value !== values[key as keyof UpdateAuthorFormType],
    );
    setHaveChanges(haveChanges);
  };

  return (
    <Fragment>
      <Tooltip content="Editar Autor" color="warning">
        <Button
          isIconOnly
          color="warning"
          aria-label="editar autor"
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
              validationSchema={updateAuthorSchema}
              onSubmit={handleSubmit}
              validateOnMount
              validate={handleChanges}
            >
              {({
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
                handleReset,
              }) => (
                <Fragment>
                  <ModalHeader>
                    <p className="w-full text-center text-xl font-bold uppercase md:text-2xl">
                      Editar Autor
                      <span className="ml-2 text-orange-500">
                        {author.alias}
                      </span>
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    {values.image_url}
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
    </Fragment>
  );
};
