import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './db/user/user.module';
import { AuthModule } from './db/auth/auth.module';
import { FileModule } from './db/file/file.module';
import { PostModule } from './db/post/post.module';
import { BlacklistModule } from './db/blacklist/blacklist.module';
import { MailController } from './db/mailer/mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './db/mailer/mail.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    FileModule,
    PostModule,
    BlacklistModule,
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          port: 465,
          host: 'smtp.yandex.ru',
          secure: true,
          defaults: {
            from: '"Ky" <process.env.EMAIL_USER>',
          },
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
      }),
    }),
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
