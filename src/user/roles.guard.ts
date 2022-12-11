import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from "./role.enum";
import { ROLES_KEY } from "./roles.decorator";
import { Request } from "express";
import { User } from "./user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
 constructor(private reflector: Reflector) {}

 canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
   context.getHandler(),
   context.getClass(),
  ]);
  if (!requiredRoles) {
   return true;
  }
  const user = context.switchToHttp().getRequest<Request>().user as User;
  return requiredRoles.some((role) => user.roles?.includes(role));
 }
}