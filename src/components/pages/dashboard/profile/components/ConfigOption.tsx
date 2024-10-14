"use client";

import { PASSWORD_CHANGE_SUCCESS_MESSAGE } from "@/constants";
import { ChangePasswordFormType } from "@/helpers/form-types";
import { changePasswordSchema } from "@/helpers/schemas";
import { AuthService } from "@/services";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import { toast } from "sonner";

export const ConfigOption = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: ChangePasswordFormType = {
    current_password: "",
    confirm_password: "",
    new_password: "",
  };

  const handleSubmit = async (values: ChangePasswordFormType) => {
    setIsLoading(true);
    try {
      await AuthService.changePassword(values);
      toast.success(PASSWORD_CHANGE_SUCCESS_MESSAGE);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={changePasswordSchema}
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
          <div className="flex w-full flex-col gap-4">
            <Input
              label="Contraseña actual"
              variant="bordered"
              isRequired
              type="password"
              value={values.current_password}
              onChange={handleChange("current_password")}
              isInvalid={
                !!errors.current_password && !!touched.current_password
              }
              errorMessage={errors.current_password}
            />
            <Input
              label="Nueva contraseña"
              variant="bordered"
              isRequired
              type="password"
              value={values.new_password}
              onChange={handleChange("new_password")}
              isInvalid={!!errors.new_password && !!touched.new_password}
              errorMessage={errors.new_password}
            />
            <Input
              label="Confirmar contraseña"
              variant="bordered"
              isRequired
              type="password"
              value={values.confirm_password}
              onChange={handleChange("confirm_password")}
              isInvalid={
                !!errors.confirm_password && !!touched.confirm_password
              }
              errorMessage={errors.confirm_password}
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
              Guardar
            </Button>
          </div>
        </Fragment>
      )}
    </Formik>
  );
};
