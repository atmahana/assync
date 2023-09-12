import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const username = req.query["id"];

    if (!username || typeof username !== "string") {
      throw new Error("Invalid Username");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        coverImage: true,
        createdAt: true,
        followingIds: true,
        hasNotification: true,
        profileImage: true,
      }
    });

    // const followersCount = await prisma.user.count({
    //   where: {
    //     followingIds: {
    //       has: username,
    //     },
    //   },
    // });

    return res.status(200).json({ ...existingUser });
  } catch (error) {
    return res.status(400).end();
  }
}
