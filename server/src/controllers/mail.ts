import { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import { User } from '@prisma/client';

export const getMailCounts = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id as string;

    const [totalMails, unreadMails, savedMails, sentMails] = await Promise.all([
      prisma.message.count({
        where: {
          recipients: {
            some: { recipientId: userId, isDeleted: false },
          },
        },
      }),
      prisma.message.count({
        where: {
          recipients: {
            some: { recipientId: userId, isRead: false },
          },
        },
      }),
      prisma.message.count({
        where: {
          recipients: {
            some: { recipientId: userId, isSaved: true },
          },
        },
      }),
      prisma.message.count({
        where: {
          senderId: userId,
          isDeleted: false,
        },
      }),
    ]);

    return res.status(200).json({
      total: totalMails,
      unread: unreadMails,
      saved: savedMails,
      sent: sentMails,
    });
  } catch (error) {
    console.error('Error fetching mail counts:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMails = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id as string;
    const { filter, query, page = 1, limit = 10 } = req.query; // EXPECTED: received, sent, saved

    let whereClause: any = {};

    switch (filter) {
      case 'sent':
        whereClause = {
          senderId: userId,
          isDeleted: false,
        };
        break;
      case 'saved':
        whereClause = {
          recipients: {
            some: {
              recipientId: userId,
              isSaved: true,
            },
          },
        };
        break;
      case 'received':
      default:
        whereClause = {
          recipients: {
            some: {
              recipientId: userId,
              isDeleted: false,
            },
          },
        };
        break;
    }

    if (query) {
      whereClause.OR = [
        { subject: { contains: query as string, mode: 'insensitive' } },
        { body: { contains: query as string, mode: 'insensitive' } },
      ];
    }

    const mails = await prisma.message.findMany({
      where: whereClause,
      select: {
        id: true,
        subject: true,
        body: true,
        senderId: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        recipients: {
          where: { recipientId: userId },
          select: {
            isRead: true,
            isArchived: true,
            isDeleted: true,
            isSaved: true,
            recipient: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    return res.status(200).json(mails);
  } catch (error) {
    console.error('Error fetching mails:', error);
    return res.status(500).json({ error: 'Internal server error' });
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

    const message = await prisma.$transaction(async tx => {
      const createdMessage = await tx.message.create({
        data: {
          subject,
          body,
          senderId,
        },
      });

      await tx.messageRecipient.create({
        data: {
          messageId: createdMessage.id,
          recipientId: recipient.id,
        },
      });

      return createdMessage;
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const saveMail = async (req: Request, res: Response) => {
  try {
    const { mailId } = req.body;
    const user = res.locals.user as User;

    const recipient = await prisma.messageRecipient.findFirst({
      where: {
        messageId: mailId,
        recipientId: user.id,
      },
      select: {
        isSaved: true,
      },
    });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const newIsSaved = !recipient.isSaved;

    const updatedMessage = await prisma.message.update({
      where: { id: mailId },
      data: {
        recipients: {
          updateMany: {
            where: { recipientId: user.id },
            data: { isSaved: newIsSaved },
          },
        },
      },
      include: { recipients: true },
    });

    const updatedRecipient = updatedMessage.recipients.find(
      r => r.recipientId === user.id
    );

    console.log(updatedRecipient);
    return res.status(200).json({ recipient: updatedRecipient });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const setMailAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = res.locals.user as User;

    const recipient = await prisma.messageRecipient.findFirst({
      where: {
        messageId: id,
        recipientId: user.id,
      },
      select: {
        isRead: true,
      },
    });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    if (recipient.isRead) {
      return res.status(200).json({ message: 'Mail already read' });
    }

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: {
        recipients: {
          updateMany: {
            where: { recipientId: user.id },
            data: { isRead: true },
          },
        },
      },
      include: { recipients: true },
    });

    const updatedRecipient = updatedMessage.recipients.find(
      r => r.recipientId === user.id
    );

    return res.status(200).json({ recipient: updatedRecipient });
  } catch (error) {
    console.error('Error setting mail as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMailDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await prisma.message.findUnique({
      where: { id },
      select: {
        id: true,
        subject: true,
        body: true,
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        recipients: {
          select: {
            isRead: true,
            isArchived: true,
            isDeleted: true,
            isSaved: true,
            recipient: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      return res.status(404).json({ error: 'Mail not found' });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error('Error fetching mail details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
