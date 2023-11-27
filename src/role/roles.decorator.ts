import { SetMetadata } from "@nestjs/common"
import { Roles } from "./roles.enum";


export const ROLE_KEY = 'roles';
export const HasRole = (...roles: Roles[]) => SetMetadata(ROLE_KEY,roles);