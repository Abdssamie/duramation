import prisma from "../prisma";
import { ClerkUserId, InternalUserId } from "@/types/user";

export async function getInternalUserId(clerkId: ClerkUserId): Promise<InternalUserId | null> {
    const user = await prisma.user.findUnique({
      where: { id: clerkId },
      select: { id: true }
    });
    return user?.id as InternalUserId || null;
  }
  