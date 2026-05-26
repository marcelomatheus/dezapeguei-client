export type OfferStatus = "ACTIVE" | "INACTIVE" | "SOLD" | "PENDING" | "CANCELED" | "SOLD_OUT";
export type OfferCondition = "NEW" | "USED_LIKE_NEW" | "USED_GOOD" | "USED_FAIR";

export type Offer = {
  id: string;
  title: string;
  description: string;
  price: number;
  promotion?: number;
  condition: OfferCondition;
  status: OfferStatus;
  sellerId: string;
  categoryId: string;
  slug: string;
  imageUrl: string[];
  keywords?: Array<{ id: string; word: string }>;
  specifications?: Array<{ id: string; key: string; value: string }>;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  instagram?: string;
  avatar?: string;
  bio?: string;
  rating: number;
  salesCount: number;
  purchasesCount: number;
  city?: string;
  state?: string;
  plan: "FREE" | "PREMIUM" | "ENTERPRISE";
};

export type ChatMessageType = "TEXT" | "IMAGE" | "OFFER" | "SYSTEM";
export type ChatMessageStatus = "SENDING" | "SENT" | "DELIVERED" | "READ" | "FAILED";

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: ChatMessageType;
  status: ChatMessageStatus;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Chat = {
  id: string;
  isGroup: boolean;
  name?: string;
  participants: Array<{
    id: string;
    userId: string;
    chatId: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type SaleStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export type Sale = {
  id: string;
  offerId: string;
  buyerId: string;
  amount: number;
  status: SaleStatus;
  saleDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  redirect?: string;
  createdAt: string;
  updatedAt: string;
};
