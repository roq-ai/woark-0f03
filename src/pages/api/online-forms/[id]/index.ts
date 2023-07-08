import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { onlineFormValidationSchema } from 'validationSchema/online-forms';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.online_form
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getOnlineFormById();
    case 'PUT':
      return updateOnlineFormById();
    case 'DELETE':
      return deleteOnlineFormById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOnlineFormById() {
    const data = await prisma.online_form.findFirst(convertQueryToPrismaUtil(req.query, 'online_form'));
    return res.status(200).json(data);
  }

  async function updateOnlineFormById() {
    await onlineFormValidationSchema.validate(req.body);
    const data = await prisma.online_form.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteOnlineFormById() {
    const data = await prisma.online_form.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
