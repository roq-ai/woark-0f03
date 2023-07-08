import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { onlineFormValidationSchema } from 'validationSchema/online-forms';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOnlineForms();
    case 'POST':
      return createOnlineForm();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOnlineForms() {
    const data = await prisma.online_form
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'online_form'));
    return res.status(200).json(data);
  }

  async function createOnlineForm() {
    await onlineFormValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.online_form.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
