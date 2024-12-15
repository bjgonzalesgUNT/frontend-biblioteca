import { UserAuthModel } from "@/models";
import { JWTPayload } from "jose";

export interface IPayload extends JWTPayload, UserAuthModel {}
