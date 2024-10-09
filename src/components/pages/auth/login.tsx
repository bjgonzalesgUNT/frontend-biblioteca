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

      toast.success("Inicio de sesión correcto");
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
                color=""
                className="w-full shadow-md hover:bg-blue-500 bg-blue-400 border border-blue-500"
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </Formik>
        <div className="mt-4">
          <button className="flex items-center justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-300 rounded-xl  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" 
                  x="0px" y="0px" width="25" height="25" 
                  viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span className="text-gray-700 font-medium">Continuar con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
