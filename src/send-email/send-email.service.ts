/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
@Injectable()
export class SendEmailService {

  async welcome(createSendEmailDto: { to: string; subject: string; }) {
    const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>Bem-vindo à New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
                    <tr>
                      <td>
                        <h1 style="color:#333333; text-align:center;">Bem-vindo à New Music, ${name}!</h1>
                        <p style="color:#555555; font-size:16px; line-height:1.5;">
                          Obrigado por se juntar à nossa plataforma. Aqui você vai distribuir suas músicas de forma simples, rápida e eficiente, com playlists exclusivas e muito mais!
                        </p>
                        <p style="text-align:center; margin:30px 0;">
                          <a href="${process.env.APP_URL}/login" 
                             style="background-color:#179297; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;">
                            Acessar sua conta
                          </a>
                        </p>
                        <p style="color:#888888; font-size:12px; text-align:center;">
                          Se tiver alguma dúvida, responda este e-mail ou entre em contato conosco.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
  async finishContract(createSendEmailDto: { to: string; subject: string; }) {
    const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
        <meta charset="UTF-8" />
        <title>Confirmação de Assinatura de Contrato - New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
            <tr>
              <td>
            <h1 style="color:#333333; text-align:center;">Olá, ${name}!</h1>
            <p style="color:#555555; font-size:16px; line-height:1.5;">
              Seu contrato com a New Music foi assinado com sucesso.
            </p>
            <p style="color:#555555; font-size:16px; line-height:1.5;">
              Agradecemos pela parceria e confiança. Agora você tem acesso a todas as funcionalidades da nossa plataforma.
            </p>
            <p style="text-align:center; margin:30px 0;">
              <a href="${process.env.APP_URL}/dashboard"
                 style="background-color:#179297; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;">
                Ir para o Painel
              </a>
            </p>
            <p style="color:#888888; font-size:12px; text-align:center;">
              Se tiver alguma dúvida, responda este e-mail ou entre em contato com nossa equipe de suporte.
            </p>
              </td>
            </tr>
          </table>
            </td>
          </tr>
        </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
  async recovery(createSendEmailDto: { to: string; subject: string; }) {
     const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];
      const resetLink = `${process.env.APP_URL}/reset-password?email=${encodeURIComponent(to)}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>Recuperação de Senha - New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
                    <tr>
                      <td>
                        <h1 style="color:#333333; text-align:center;">Olá, ${name}</h1>
                        <p style="color:#555555; font-size:16px; line-height:1.5;">
                          Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:
                        </p>
                        <p style="text-align:center; margin:30px 0;">
                          <a href="${resetLink}"
                             style="background-color:#179297; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;"
                             target="_blank">
                            Redefinir senha
                          </a>
                        </p>
                        <p style="color:#888888; font-size:12px; text-align:center;">
                          Se você não solicitou essa alteração, ignore este e-mail. Esse link expira em 1 hora.
                        </p>
                        <p style="color:#888888; font-size:12px; text-align:center; margin-top:20px;">
                          Atenciosamente,<br/>Equipe New Music
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  async blocked(createSendEmailDto: { to: string; subject: string; }) {
     const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];
      const resetLink = `${process.env.APP_URL}/reset-password?email=${encodeURIComponent(to)}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>Aviso de Conta Bloqueada - New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
                    <tr>
                      <td>
                        <h1 style="color:#333333; text-align:center;">Olá, ${name}</h1>
                        <p style="color:#555555; font-size:16px; line-height:1.5;">
                          Detectamos atividades incomuns na sua conta e, por sua segurança, ela foi bloqueada temporariamente.
                        </p>
                        <p style="color:#555555; font-size:16px; line-height:1.5;">
                          Para desbloquear sua conta, clique no botão abaixo e siga as instruções:
                        </p>
                        <p style="text-align:center; margin:30px 0;">
                          <a href="${resetLink}"
                             style="background-color:#E53E3E; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;"
                             target="_blank">
                            Desbloquear Minha Conta
                          </a>
                        </p>
                        <p style="color:#888888; font-size:12px; text-align:center;">
                          Se você não reconhece essa ação, por favor entre em contato conosco em
                          <a href="mailto:support@newmusic.com" style="color:#179297;">support@newmusic.com</a>.
                        </p>
                        <p style="color:#888888; font-size:12px; text-align:center; margin-top:20px;">
                          Atenciosamente,<br/>Equipe New Music
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }


  async blockedDefinition(createSendEmailDto: { to: string; subject: string; }) {
     const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];
      const resetLink = `${process.env.APP_URL}/reset-password?email=${encodeURIComponent(to)}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
        <meta charset="UTF-8" />
        <title>Conta Encerrada - New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
            <tr>
              <td>
            <h1 style="color:#333333; text-align:center;">Olá, ${name}</h1>
            <p style="color:#555555; font-size:16px; line-height:1.5;">
              Informamos que sua conta na New Music foi bloqueada em virtude de decisão ou rescisão de contrato.
            </p>
            <p style="color:#555555; font-size:16px; line-height:1.5;">
              Caso você tenha dúvidas sobre os termos da rescisão ou precise de mais informações,
              entre em contato conosco pelo e-mail
              <a href="mailto:support@newmusic.com" style="color:#179297;">support@newmusic.com</a>.
            </p>
            <p style="text-align:center; margin:30px 0;">
              <a href="${process.env.APP_URL}/help"
                 style="background-color:#E53E3E; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;"
                 target="_blank">
                Suporte New Music
              </a>
            </p>
            <p style="color:#888888; font-size:12px; text-align:center;">
              Lamentamos qualquer inconveniente e agradecemos por ter feito parte da nossa plataforma.
            </p>
            <p style="color:#888888; font-size:12px; text-align:center; margin-top:20px;">
              Atenciosamente,<br/>Equipe New Music
            </p>
              </td>
            </tr>
          </table>
            </td>
          </tr>
        </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  async release(createSendEmailDto: { to: string; subject: string; }) {
     const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
        <meta charset="UTF-8" />
        <title>Seu Lançamento Foi Publicado - New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
            <tr>
              <td>
            <h1 style="color:#333333; text-align:center;">Olá, ${name}!</h1>
            <p style="color:#555555; font-size:16px; line-height:1.5;">
              Seu lançamento musical foi ao ar com sucesso na New Music! 
            </p>
            <p style="color:#555555; font-size:16px; line-height:1.5;">
              Agora seu público pode ouvir e compartilhar sua música.
            </p>
            <p style="text-align:center; margin:30px 0;">
              <a href="${process.env.APP_URL}/releases"
                 style="background-color:#179297; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;"
                 target="_blank">
                Ver meu lançamento
              </a>
            </p>
            <p style="color:#888888; font-size:12px; text-align:center;">
              Obrigado por escolher a New Music para compartilhar sua arte!
            </p>
              </td>
            </tr>
          </table>
            </td>
          </tr>
        </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  async sendEmail(createSendEmailDto: { to: string; subject: string; }) {
    const { to, subject } = createSendEmailDto;
    try {
      const name = to.split('@')[0];
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <title>Bem-vindo à New Music</title>
          </head>
          <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; margin-top:40px; border-radius:8px;">
                    <tr>
                      <td>
                        <h1 style="color:#333333; text-align:center;">Bem-vindo à New Music, ${name}!</h1>
                        <p style="color:#555555; font-size:16px; line-height:1.5;">
                          Obrigado por se juntar à nossa plataforma. Aqui você vai distribuir suas músicas de forma simples, rápida e eficiente, com playlists exclusivas e muito mais!
                        </p>
                        <p style="text-align:center; margin:30px 0;">
                          <a href="${process.env.APP_URL}" 
                             style="background-color:#179297; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px;">
                            Acessar sua conta
                          </a>
                        </p>
                        <p style="color:#888888; font-size:12px; text-align:center;">
                          Se tiver alguma dúvida, responda este e-mail ou entre em contato conosco.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const data = await resend.emails.send({
        from: 'New Music <delivered@resend.dev>',
        to,
        subject,
        html: htmlContent,
      });
      return 'Email enviado com sucesso!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}
