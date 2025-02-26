import { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import { User } from '@prisma/client';

export const getMailCounts = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id as string;

    const totalMails = await prisma.message.count({
      where: {
        recipients: {
          some: {
            recipientId: userId,
            isDeleted: false,
          },
        },
      },
    });

    const unreadMails = await prisma.message.count({
      where: {
        recipients: {
          some: {
            recipientId: userId,
            isRead: false,
          },
        },
      },
    });

    const savedMails = await prisma.message.count({
      where: {
        recipients: {
          some: {
            recipientId: userId,
            isSaved: true,
          },
        },
      },
    });

    const sentMails = await prisma.message.count({
      where: {
        senderId: userId,
        isDeleted: false,
      },
    });

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
    const { filter } = req.query; // EXPECTED: received, sent, saved

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
