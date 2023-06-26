import { Controller, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto) {
    const updatedUser = await this.userService.updateUserById(
      id,
      updateUserDto,
    );
    return updatedUser;
  }
}
