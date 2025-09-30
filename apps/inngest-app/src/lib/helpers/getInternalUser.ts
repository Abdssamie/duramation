import { User } from "@duramation/db";
import prisma from "../prisma";
import { ClerkUserId } from "@/types/user";

export async function getInternalUser(clerkId: ClerkUserId): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { clerk_id: clerkId },
    });

    return user || null;
  }
