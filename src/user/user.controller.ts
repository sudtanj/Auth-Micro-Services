import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "./roles.decorator";
import { Role } from "./role.enum";
import { User } from "./user.entity";
import { SignUp } from "../auth/dto/sign-up.dto";
import { SessionAuthGuard } from "../auth/guards/session-auth.guard";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("/user")
@ApiTags("User")
export class UserController {
 constructor(
  private userService: UserService,
 ) {
 }

 @Get("/")
 @HttpCode(HttpStatus.OK)
 @ApiResponse({ status: 200, description: 'Success.', type: [User] })
 @ApiOperation({ summary: 'list all user available. admin and user can access!' })
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(Role.Admin, Role.User)
 async list(): Promise<User[]> {
  return this.userService.findAll({})
 }

 @Get("/:id")
 @HttpCode(HttpStatus.OK)
 @ApiResponse({ status: 200, description: 'Success.', type: User })
 @ApiOperation({ summary: 'get detail of user. admin and user can access!' })
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(Role.Admin, Role.User)
 async detail(@Param("id") id: string) {
  return this.userService.findOne({
   where: {
    id: Number.parseInt(id)
   }
  })
 }

 @Post('/')
 @HttpCode(HttpStatus.CREATED)
 @ApiResponse({ status: HttpStatus.CREATED, description: 'Success.', type: User })
 @ApiOperation({ summary: 'create new user. admin can access!' })
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(Role.Admin)
 async register(@Body() signUp: SignUp): Promise<User> {
  return this.userService.create(signUp)
 }

 @Patch("/:id")
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @ApiResponse({ status: HttpStatus.OK, description: 'Success.', type: User })
 @ApiOperation({ summary: 'update existing user. admin can access!' })
 @Roles(Role.Admin)
 async update(@Param("id") id: string, @Body() body: User) {
  return this.userService.update(Number.parseInt(id), body)
 }

 @Delete("/:id")
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @ApiResponse({ status: HttpStatus.OK, description: 'Success.', type: User })
 @ApiOperation({ summary: 'delete existing user. admin can access!' })
 @Roles(Role.Admin)
 async delete(@Param("id") id: string) {
  return this.userService.delete(Number.parseInt(id))
 }

}