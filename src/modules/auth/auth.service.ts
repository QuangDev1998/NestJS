import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { createUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';
@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async login(createUserDto: createUserDto) {
    const { email, pass_word } = createUserDto;
    const userExists = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      throw new BadRequestException(`Tài khoản chưa tồn tại, Vui lòng đăng ký`);
    }
    if (!userExists.pass_word) {
      if (userExists.face_app_id) {
        throw new BadRequestException(
          `Vui long đang nhập bằng bằng facebook , để tạo mật khẩu mới `,
        );
      }
      if (userExists.goole_id) {
        throw new BadRequestException(
          `Vui long đang nhập bằng bằng google , để tạo mật khẩu mới `,
        );
      }
      throw new BadRequestException(
        `Không hợp lệ, vui lòng liên hệ chăm sóc khách hàng `,
      );
    }
    // so sánh password
    const isPassword = bcrypt.compareSync(pass_word, userExists.pass_word);

    if (!isPassword) {
      throw new BadRequestException(`Mật khẩu không chính xác`);
    }
    const tokens = this.createTokens(userExists.user_id);
    return tokens;
  }

  createTokens(userId) {
    if (!userId) throw new BadRequestException(`Tài khoản không hợp lệ :: 1`);
    const accessToken = this.jwt.sign(
      { userId: userId },
      {
        expiresIn: ACCESS_TOKEN_EXPIRED,
        secret: ACCESS_TOKEN_SECRET,
      },
    );

    const refreshToken = this.jwt.sign(
      { userId: userId },
      {
        expiresIn: REFRESH_TOKEN_EXPIRED,
        secret: REFRESH_TOKEN_SECRET,
      },
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
