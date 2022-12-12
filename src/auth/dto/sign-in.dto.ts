import { IsDefined, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsUserAlreadyExist } from "../../user/is-user-already-exist.validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
 @IsDefined()
 @IsString()
 @Validate(IsUserAlreadyExist)
 @ApiProperty({ example: "john", description: 'username for login' })
 readonly username: string;

 @IsDefined()
 @IsNotEmpty()
 @MinLength(8)
 @ApiProperty({ example: "password", description: 'user password for login' })
 readonly password: string;
}