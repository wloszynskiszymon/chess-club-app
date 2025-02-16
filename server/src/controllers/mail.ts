import { Request, Response } from 'express';
import prisma from '../prisma/prisma';

export const getMails = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id as string;

    const messages = await prisma.message.findMany({
      where: {
        recipients: {
          some: { recipientId: userId },
        },
      },
      include: { recipients: true },
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMail = async (req: Request, res: Response) => {
  try {
    const { to, subject, body } = req.body;
    const senderId = res.locals.user.id as string;

    const recipient = await prisma.user.findUnique({
      where: { email: to },
    });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const message = await prisma.message.create({
      data: {
        subject,
        body,
        senderId,
        recipients: {
          create: [{ recipientId: recipient.id }],
        },
      },
      include: { recipients: true },
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
