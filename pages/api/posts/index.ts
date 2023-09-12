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
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;
      
      let posts;
      
      // retrieve all posts belongs to a user
      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
              }
            },
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } 

      // retrieve all posts
      else {
        posts = await prisma.post.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
              }
            },
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(400).end();
  }
}
