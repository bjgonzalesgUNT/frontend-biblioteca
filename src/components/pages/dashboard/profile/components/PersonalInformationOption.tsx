"use client";

import { PROFILE_UPDATE_SUCCESS_MESSAGE } from "@/constants";
import { IProfileStore, updateProfile } from "@/context/profile";
import { UpdatePersonFormType } from "@/helpers/form-types";
import { updatePersonSchema } from "@/helpers/schemas";
import { PeopleService } from "@/services";
import { parseDate } from "@internationalized/date";
import { Button, DateInput, Input, Skeleton } from "@nextui-org/react";
import { Formik } from "formik";
import { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const PersonalInformationOption = () => {
  const profile = useSelector((state: IProfileStore) => state.profile);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: UpdatePersonFormType = {
    telephone: profile.telephone,
    address: profile.address,
  };

  const handleSubmit = useCallback(
    async (values: UpdatePersonFormType) => {
      setIsLoading(true);
      try {
        const personUpdated = await PeopleService.updateOne(values);
        dispatch(updateProfile(personUpdated));
        toast.success(PROFILE_UPDATE_SUCCESS_MESSAGE);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return (
    <Skeleton isLoaded={!!profile}>
      <Formik
        initialValues={initialValues}
        validationSchema={updatePersonSchema}
        onSubmit={handleSubmit}
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
            <div className="grid w-full grid-cols-1 flex-col gap-4 md:grid-cols-2">
              <Input
                label="Apellidos"
                variant="bordered"
                value={profile.surnames}
                isRequired
                isReadOnly
                isDisabled
              />
              <Input
                label="Nombres"
                variant="bordered"
                value={profile?.names}
                isRequired
                isReadOnly
                isDisabled
              />
              <Input
                label="Documento"
                variant="bordered"
                value={profile?.document}
                isRequired
                isReadOnly
                isDisabled
              />
              <DateInput
                label="Fecha de nacimiento"
                variant="bordered"
                value={profile?.date ? parseDate(profile.date) : null}
                isReadOnly
                isDisabled
              />
              <Input
                label="Telefono"
                variant="bordered"
                defaultValue={profile.telephone}
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
            </div>
            <div className="flex w-full justify-end gap-2 pt-4">
              <Button color="secondary" onPress={() => handleReset()}>
                Restaurar
              </Button>
              <Button
                color="primary"
                onPress={() => handleSubmit()}
                isLoading={isLoading}
              >
                Actualizar
              </Button>
            </div>
          </Fragment>
        )}
      </Formik>
    </Skeleton>
  );
};
