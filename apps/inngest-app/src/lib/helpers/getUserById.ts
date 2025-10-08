import { User } from "@duramation/db/types";
import prisma from "../prisma";
import { InternalUserId } from "@/types/user";

export async function getUserById(userId: InternalUserId): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  return user;
}
