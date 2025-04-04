import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import VideoModule from './modules/video/video.module';
import PrismaModule from './modules/prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { VideoTypeModule } from './modules/video-type/video-type.module';
import { CheckTokenStrategy } from './modules/auth/token/token-strategy';
import { CheckPermissionStrategy } from './modules/auth/permission/permission-strategy';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    ConfigModule.forRoot(),
    VideoModule,
    PrismaModule,
    UserModule,
    AuthModule,
    VideoTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, CheckTokenStrategy, CheckPermissionStrategy],
})
export class AppModule {}
