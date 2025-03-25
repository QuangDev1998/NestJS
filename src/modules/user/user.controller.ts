import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}
  @UseInterceptors(FileInterceptor('avatar'))
  @Post(`avatar-local`)
  async avatarLocal(@UploadedFile() file) {
    return await this.userService.avatarLocal(file);
  }
}
