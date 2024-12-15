"use client";

import { setProfile } from "@/context/profile";
import { useSession } from "@/hooks/useSession";
import { PeopleService } from "@/services";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Skeleton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  ConfigOption,
  PersonalInformationOption,
  UserInformationOption,
} from "./components";

export const ProfileWrapper = () => {
  const { session } = useSession();

  const dispatch = useDispatch();

  const handleGetPerson = useCallback(async () => {
    try {
      const person = await PeopleService.findOneByDocument();
      dispatch(setProfile(person));
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetPerson();
  }, [handleGetPerson]);

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader className="relative">
          <Image
            src="https://plus.unsplash.com/premium_photo-1673177667569-e3321a8d8256?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user-profiel"
            width="100%"
            height={150}
            content="User profile"
            className="object-cover"
            classNames={{ wrapper: "w-full" }}
            isZoomed
          />
          <div className="absolute -bottom-1/2 end-4 start-8 md:start-10">
            <Avatar className="z-10 h-24 w-24 md:h-28 md:w-28" />
            <Skeleton isLoaded={!!session?.user} className="mt-2 rounded-md">
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <h3 className="text-xl font-bold md:text-2xl">
                  {session?.user?.surnames.split(" ")[0]}{" "}
                  {session?.user?.names.split(" ")[0]}
                </h3>
                <Chip color="success" variant="bordered" size="sm">
                  <p className="font-medium uppercase">{session?.user?.role}</p>
                </Chip>
              </div>
            </Skeleton>
          </div>
        </CardHeader>
        <CardBody className="mt-24">
          <Tabs aria-label="Dynamic tabs" variant="underlined">
            <Tab key="user" title="Informacion de usuario">
              <UserInformationOption />
            </Tab>
            <Tab key="profile" title="Informacion Personal">
              <PersonalInformationOption />
            </Tab>
            <Tab key="config" title="Configuracion">
              <ConfigOption />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};
