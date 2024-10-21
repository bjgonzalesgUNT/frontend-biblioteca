"use client";

import { GoogleIcon } from "@/components/icons";
import { LoginFormType } from "@/helpers/form-types";
import { loginSchema } from "@/helpers/schemas";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import { toast } from "sonner";

export const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: LoginFormType = {
    username: "70452182",
    password: "70452182",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      setIsLoading(true);
      try {
        // const { user } = await singIn(values);
        const { user } = {
          user: {
            id: 1,
            username: "70452182",
            names: "BRANDON JOSEPH",
            surnames: "GONZALES GUTIERREZ",
            document: "70452182",
            role: "admin",
            pages: ["/dashboard", "/dashboard/users"],
            status: true,
          },
          // token:
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiI3MDQ1MjE4MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyOTUxMzcwOSwiZXhwIjoxNzI5NjAwMTA5fQ.b8dEAg3LRBc_2lLDHnR4x-vWlpJZwHbGs9l7ufZm8tA",
          // iat: 1729513709,
          // exp: 1729517309,
        };

        switch (user.role) {
          case "admin":
            return router.replace("/dashboard");
          case "user":
            return router.replace("/");
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
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
        validationSchema={loginSchema}
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
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onPress={() => handleSubmit()}
                >
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
