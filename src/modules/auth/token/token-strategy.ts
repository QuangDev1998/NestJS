import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from '../../../common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CheckTokenStrategy extends PassportStrategy(
  Strategy,
  'check-token',
) {
  constructor(public prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET as string,
    });
  }

  async validate(payload: any) {
    console.log(`TOKEN - validate`);
    const user = await this.prisma.users.findUnique({
      where: {
        user_id: payload.userId,
      },
    });
    //    return về cái gì thì nestjs tự động gắn cái đó vào req
    return user;
  }
}
