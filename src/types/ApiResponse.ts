import { User_Username } from "@/app/api/all-users/route";
import { Message } from "@/model/user.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
  users?: Array<User_Username>;
  allUsers?: Array<{username: string}>;
  imageUrl?: string;
  totalPages?: number;
}

