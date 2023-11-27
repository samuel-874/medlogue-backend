import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./roles.enum";
import { ROLE_KEY } from "./roles.decorator";
import { User } from "src/user/entity/user.entity";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);

          if (!requiredRoles) {
            return true;
          }

          const { user } = context.switchToHttp().getRequest();
        
          if(!user){
            throw new UnauthorizedException("No user attached");
          }
            
          return requiredRoles.some((role) => role === user.role);
        }
}