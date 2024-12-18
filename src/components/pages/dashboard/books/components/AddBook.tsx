"use client";

import { UrlIcon } from "@/components/icons";
import { PlusIcon } from "@/components/icons/accounts/plus-icon";
import { BOOK_CREATE_SUCCESS_MESSAGE } from "@/constants";
import { addBook, useBooksDispatch } from "@/context/books";
import { BookFormType } from "@/helpers/form-types/book.form-type";
import { createBookSchema } from "@/helpers/schemas";
import {
  AuthorModel,
  PublisherModel,
  Summary1Model,
  Summary2Model,
  Summary3Model,
} from "@/models";
import {
  AuthorsService,
  BooksService,
  PublishersService,
  SummariesService,
} from "@/services";
import { parseDate } from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DateInput,
  DateValue,
  Divider,
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

export const AddBook = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [summaries1, setSummaries1] = useState<Summary1Model[]>([]);
  const [summaries2, setSummaries2] = useState<Summary2Model[]>([]);
  const [summaries3, setSummaries3] = useState<Summary3Model[]>([]);
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [publishers, setPublishers] = useState<PublisherModel[]>([]);

  const dispatch = useBooksDispatch();

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const [s1, s2, s3, authors, publishers] = await Promise.all([
        SummariesService.getS1(),
        SummariesService.getS2(),
        SummariesService.getS3(),
        AuthorsService.getAll(),
        PublishersService.getAll(),
      ]);
      setSummaries1(s1);
      setSummaries2(s2);
      setSummaries3(s3);
      setAuthors(authors);
      setPublishers(publishers);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleOpenModal = async () => {
    onOpen();
    await handleFetch();
  };

  const initialValues: BookFormType = {
    title: "",
    summary_1_id: "",
    summary_2_id: "",
    deway_id: "",
    author_id: "",
    publisher_id: "",
    description: "",
    pages: "",
    edition: "",
    published_at: undefined,
  };

  const handleSubmit = useCallback(
    async (values: BookFormType) => {
      setIsLoading(true);
      try {
        const newBook = await BooksService.create({
          ...values,
          published_at: parseDate(values.published_at!.toString()),
        });
        dispatch(addBook(newBook));
        toast.success(BOOK_CREATE_SUCCESS_MESSAGE);
        onOpenChange();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, onOpenChange],
  );

  return (
    <div>
      <Button
        onPress={handleOpenModal}
        color="primary"
        startContent={<PlusIcon />}
      >
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
              <ModalHeader>Agregar libro</ModalHeader>

              <Formik
                initialValues={initialValues}
                validationSchema={createBookSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <Fragment>
                    <ModalBody>
                      <div className="flex w-full flex-col gap-4">
                        {/* Title */}
                        <Input
                          label="Titulo"
                          variant="bordered"
                          isRequired
                          value={values.title}
                          onChange={handleChange("title")}
                          isInvalid={!!errors.title && !!touched.title}
                          errorMessage={errors.title}
                        />

                        <Divider className="my-2" />

                        {/* Summaries */}
                        <Autocomplete
                          label="Sumario #1"
                          variant="bordered"
                          isRequired
                          isLoading={isFetching}
                          defaultItems={summaries1}
                          selectedKey={values.summary_1_id}
                          onSelectionChange={(value) => {
                            handleChange({
                              target: { name: "summary_2_id", value: "" },
                            });
                            return handleChange({
                              target: {
                                name: "summary_1_id",
                                value,
                              },
                            });
                          }}
                          isInvalid={
                            !!errors.summary_1_id && !!touched.summary_1_id
                          }
                          errorMessage={errors.summary_1_id}
                        >
                          {(item) => (
                            <AutocompleteItem key={item.id}>
                              {item.description}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                        {values.summary_1_id ? (
                          <Fragment>
                            <Autocomplete
                              label="Sumario #2"
                              variant="bordered"
                              isRequired
                              isLoading={isFetching}
                              defaultItems={summaries2.filter(
                                (s2) =>
                                  s2.summary_1_id ===
                                  Number(values.summary_1_id),
                              )}
                              selectedKey={values.summary_2_id}
                              onSelectionChange={(value) =>
                                handleChange({
                                  target: {
                                    name: "summary_2_id",
                                    value,
                                  },
                                })
                              }
                              isInvalid={
                                !!errors.summary_2_id && !!touched.summary_2_id
                              }
                              errorMessage={errors.summary_2_id}
                            >
                              {(item) => (
                                <AutocompleteItem key={item.id}>
                                  {item.description}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                            {values.summary_2_id ? (
                              <Autocomplete
                                label="Sumario #3"
                                variant="bordered"
                                isRequired
                                isLoading={isFetching}
                                defaultItems={summaries3.filter(
                                  (s3) =>
                                    s3.summary_2_id ===
                                    Number(values.summary_2_id),
                                )}
                                selectedKey={values.deway_id}
                                onSelectionChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: "deway_id",
                                      value,
                                    },
                                  })
                                }
                                isInvalid={
                                  !!errors.deway_id && !!touched.deway_id
                                }
                                errorMessage={errors.deway_id}
                              >
                                {(item) => (
                                  <AutocompleteItem key={item.id}>
                                    {item.description}
                                  </AutocompleteItem>
                                )}
                              </Autocomplete>
                            ) : null}
                          </Fragment>
                        ) : null}

                        <Divider className="my-2" />

                        {/* Author */}
                        <Autocomplete
                          label="Autor"
                          variant="bordered"
                          isRequired
                          defaultItems={authors}
                          isLoading={isFetching}
                          selectedKey={values.author_id}
                          onSelectionChange={(value) =>
                            handleChange({
                              target: { name: "author_id", value },
                            })
                          }
                          isInvalid={!!errors.author_id && !!touched.author_id}
                          errorMessage={errors.author_id}
                        >
                          {(item) => (
                            <AutocompleteItem key={item.id}>
                              {`${item.surnames}, ${item.names}`}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>

                        {/* Publisher */}
                        <Autocomplete
                          label="Editorial"
                          variant="bordered"
                          isRequired
                          isLoading={isFetching}
                          defaultItems={publishers}
                          selectedKey={values.publisher_id}
                          onSelectionChange={(value) =>
                            handleChange({
                              target: { name: "publisher_id", value },
                            })
                          }
                          isInvalid={
                            !!errors.publisher_id && !!touched.publisher_id
                          }
                          errorMessage={errors.publisher_id}
                        >
                          {(item) => (
                            <AutocompleteItem key={item.id}>
                              {item.name}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>

                        {/* Description */}
                        <Input
                          label="Descripcion"
                          variant="bordered"
                          isRequired
                          value={values.description}
                          onChange={handleChange("description")}
                          isInvalid={
                            !!errors.description && !!touched.description
                          }
                          errorMessage={errors.description}
                        />

                        {/* Pages */}
                        <Input
                          label="Paginas"
                          variant="bordered"
                          type="number"
                          min={1}
                          isRequired
                          value={values.pages}
                          onChange={handleChange("pages")}
                          isInvalid={!!errors.pages && !!touched.pages}
                          errorMessage={errors.pages}
                        />

                        {/* Edition */}
                        <Input
                          label="Edicion"
                          variant="bordered"
                          isRequired
                          type="number"
                          min={1}
                          value={values.edition}
                          onChange={handleChange("edition")}
                          isInvalid={!!errors.edition && !!touched.edition}
                          errorMessage={errors.edition}
                        />

                        {/* Image */}
                        <Input
                          label="Imagen"
                          variant="bordered"
                          startContent={<UrlIcon />}
                          value={values.image_url}
                          onChange={handleChange("image_url")}
                          isInvalid={!!errors.image_url && !!touched.image_url}
                          errorMessage={errors.image_url}
                        />

                        {/* Path */}
                        <Input
                          label="Path"
                          variant="bordered"
                          startContent={<UrlIcon />}
                          value={values.path}
                          onChange={handleChange("path")}
                          isInvalid={!!errors.path && !!touched.path}
                          errorMessage={errors.path}
                        />

                        {/* Published */}
                        <DateInput
                          label="Fecha publicacion"
                          variant="bordered"
                          isRequired
                          value={values.published_at as DateValue}
                          onChange={(value) =>
                            handleChange({
                              target: { name: "published_at", value },
                            })
                          }
                          isInvalid={
                            !!errors.published_at && !!touched.published_at
                          }
                          errorMessage={errors.published_at}
                        />
                      </div>
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
