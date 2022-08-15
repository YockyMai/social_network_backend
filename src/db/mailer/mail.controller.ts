import { Body, Controller, Post } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { MailService } from './mail.service';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: EmailDto) {
    return await this.mailService.sendMail(
      sendEmailDto.email,
      sendEmailDto.username,
    );
  }
}
