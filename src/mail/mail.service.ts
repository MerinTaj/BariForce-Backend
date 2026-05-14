import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Worker } from '../worker/entities/worker.entity';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(worker: Worker): Promise<void> {
    if (!worker.email) {
      this.logger.warn(`Worker ${worker.id} does not have an email address. Skipping email.`);
      return;
    }

   await this.mailerService.sendMail({
  to: worker.email,
  subject: 'Welcome to Bariforce!',
  text: `Welcome ${worker.username}!\n\nThank you for creating a new account.\n\nDear ${worker.fullname},\n\nA warm welcome to Bariforce!\n\nWe’re delighted that you’ve already registered yourself on our app and officially joined us as our ${worker.workertype}. Your skills and experience will be a great addition to the users.\n\nIf you have any questions at all – about the app, your role, schedules, or anything else – please feel free to reach out to us directly.\n\nBest regards,\nTeam Bariforce`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #04a3ff; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #0672e4; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Welcome ${worker.username}!</h1>
      </div>
      <div style="padding: 20px;">
        <p>Dear <strong>${worker.fullname}</strong>,</p>
        <p>A warm welcome to <strong>Bariforce</strong>!</p>
        <p>We’re delighted that you’ve already registered yourself on our app and officially joined us as our <strong>${worker.workertype}</strong>. Your skills and experience will be a great addition to the users.</p>
        <p>If you have any questions at all about your role, schedules, or anything else please feel free to reach out to us directly.</p>
        <p>Best regards,<br /><strong>Team Bariforce</strong></p>
        <hr />
        <small style="color: #777;">Bariforce – Empowering Service Providers</small>
      </div>
    </div>
  `,
});
    this.logger.log(`Welcome email sent to ${worker.email}`);
  }
}