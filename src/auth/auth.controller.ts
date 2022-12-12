import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { Role } from "../user/role.enum";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignInDto } from "./dto/sign-in.dto";

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.', type: User })
  @ApiOperation({ summary: 'register new user. cannot register admin!' })
  register(@Body() signUp: SignUp): Promise<User> {
    if (signUp.roles === Role.Admin) {
      throw new BadRequestException("Cannot register using admin role!")
    }
    return this.authService.register(signUp);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success.',
    type: User,
    headers: {
      Authorization: {
        description: "token user will be store here at the header authorization response",
        example: "Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0X3VzZXIiLCJpYXQiOjE2NzA3MzI1NTEsImV4cCI6MTY3MDgxODk1MX0.iw72t9fNF1_sAo_8Vpp7beGJZA46B7JD23Ey598jVni4jhtIjF0WD_akGjhVfgG5"
      }
    }
  })
  @ApiOperation({ summary: 'login and get user token!' })
  @UseInterceptors(TokenInterceptor)
  async login(@Body() user: SignInDto): Promise<User> {
    return this.authService.login(user.username, user.password)
  }

  @Get('/me')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.', type: User })
  @ApiOperation({ summary: 'get current token profile!' })
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
