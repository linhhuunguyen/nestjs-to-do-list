import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Req } from '@nestjs/common/decorators';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    console.log(req.user);

    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    console.log(req.user);
    return this.userService.remove(+id);
  }
}
