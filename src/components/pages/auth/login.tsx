"use client";

import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: false,
      });

      toast.success("Login successful");
      router.replace("/");
    },
    [router],
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-200 p-11 rounded-lg shadow-lg w-full max-w-sm">
        <div className="mb-6 text-center text-[25px] font-bold text-black">INICIO DE SESIÓN</div>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <div className="mb-4 flex flex-col gap-4 items-center text-gray-600">
                <Input
                  variant="bordered"
                  label={<span className="text-gray-600">Email</span>}
                  type="email"
                  value={values.email}
                  isInvalid={!!errors.email && !!touched.email}
                  errorMessage={errors.email}
                  onChange={handleChange("email")}
                />
                <Input
                  variant="bordered"
                  label={<span className="text-gray-600">Contraseña</span>}
                  type="password"
                  value={values.password}
                  isInvalid={!!errors.password && !!touched.password}
                  errorMessage={errors.password}
                  onChange={handleChange("password")}
                />
              </div>

              <Button
                onPress={() => handleSubmit()}
                variant="flat"
                color="default"
                className="w-full"
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </Formik>

        <div className="mt-4 text-sm font-light text-center text-gray-500">
          Aun no tienes una cuenta ?{" "}
          <Link href="/register" className="font-bold text-black">
            Registrate ahora
          </Link>
        </div>
      </div>
    </div>
  );
};
