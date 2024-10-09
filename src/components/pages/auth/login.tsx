"use client";

import { GoogleIcon } from "@/components/icons";
import { LoginFormType } from "@/helpers/form-types";
import { LoginSchema } from "@/helpers/schemas";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback } from "react";
import { toast } from "sonner";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    username: "admin@acme.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      toast.success("Inicio de sesión correcto");
      router.replace("/");
    },
    [router],
  );

  return (
    <Card shadow="md">
      <CardHeader>
        <div className="w-full text-center text-[25px] font-bold">
          Iniciar Sesion
        </div>
      </CardHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Fragment>
            <CardBody>
              <div className="flex w-full flex-col gap-4">
                <Input
                  variant="bordered"
                  label="Username"
                  isRequired
                  value={values.username}
                  isInvalid={!!errors.username && !!touched.username}
                  errorMessage={errors.username}
                  onChange={handleChange("username")}
                />
                <Input
                  variant="bordered"
                  label="Contraseña"
                  isRequired
                  type="password"
                  value={values.password}
                  isInvalid={!!errors.password && !!touched.password}
                  errorMessage={errors.password}
                  onChange={handleChange("password")}
                />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex w-full flex-col gap-2">
                <Button color="primary" onPress={() => handleSubmit()}>
                  Iniciar Sesión
                </Button>
                <Button
                  variant="bordered"
                  className="font-semibold"
                  startContent={<GoogleIcon />}
                >
                  Entrar con google
                </Button>
              </div>
            </CardFooter>
          </Fragment>
        )}
      </Formik>
    </Card>
  );
};
