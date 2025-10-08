import { Prisma } from "@duramation/db";

export type WorkflowWithCredentials = Prisma.WorkflowGetPayload<{
  include: {
    workflowCredentials: {
      include: {
        credential: {
          select: {
            id: true;
            name: true;
            type: true;
            config: true;
          };
        };
      };
    };
  };
}>;
