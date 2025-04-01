export interface IChat {
  _id: string;
  users: string[];
  propertyId: string;
  propertyPhoto: string;
  propertyTitle: string;
  lastMessage: string;
  newMessagesUserOne: string[];
  newMessagesUserTwo: string[];
  lastMessageAt: string;
}

export interface IMessage {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  senderAvatar: string;
  senderName: string;
  createdAt: string;
}