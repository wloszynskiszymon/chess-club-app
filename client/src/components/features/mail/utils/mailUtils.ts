import { User } from '@/hooks/useAuth';
import { Message } from '@/types/mail';

// Find all messages saved by user
export const findUserSaved = (messages: Message[], email: User['email']) => {
  return messages.filter(message =>
    message.recipients.some(
      recipient => recipient.isSaved && recipient.recipient.email === email
    )
  );
};

// Find all messages sent by user
export const findUserSent = (messages: Message[], email: User['email']) => {
  return messages.filter(message => message.sender.email === email);
};

// Find all messages received by user
export const findUserReceived = (messages: Message[], email: User['email']) => {
  return messages.filter(message => message.sender.email !== email);
};
