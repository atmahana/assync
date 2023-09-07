import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { postId } = req.body;

      const bookmark = await prisma.bookmark.create({
        data: {
          userId: currentUser.id,
          postIds: [...postId]
        }
      })

      return res.status(200).json(bookmark);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      console.log({ userId });

      let bookmark;

      bookmark = await prisma.bookmark.findMany({
        where: {
          userId: userId as string,
        },
        include: {
          posts: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      })

      return res.status(200).json(bookmark);
    }
  } catch (error) {
    return res.status(400).end();
  }
}
