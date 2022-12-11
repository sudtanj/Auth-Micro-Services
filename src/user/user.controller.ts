import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "./roles.decorator";
import { Role } from "./role.enum";
import { User } from "./user.entity";

@Controller()
export class UserController {
 constructor(
  private userService: UserService
 ) {
 }

 @Get("/")
 @Roles(Role.Admin, Role.User)
 async list() {
  return this.userService.findAll({})
 }

 @Get("/:id")
 async detail(@Param("id") id: string) {
  return this.userService.findOne({
   where: {
    id: Number.parseInt(id)
   }
  })
 }

 @Post("/")
 async create(@Body() body: User) {
  return this.userService.create(body)
 }

 @Patch("/:id")
 async update(@Param("id") id: string, @Body() body: User) {
  return this.userService.update(Number.parseInt(id), body)
 }

 @Delete("/:id")
 async delete(@Param("id") id: string) {
  return this.userService.delete(Number.parseInt(id))
 }

}