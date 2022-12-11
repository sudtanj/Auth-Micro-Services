import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Validate, IsString, IsIn,
} from 'class-validator';
import { IsUserAlreadyExist } from '../../user/is-user-already-exist.validator';
import { Role } from "../../user/role.enum";

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsString()
  @Validate(IsUserAlreadyExist)
  readonly username: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsIn(Object.values(Role))
  readonly roles: Role;
}
