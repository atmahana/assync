import { useRouter } from "next/router";
import { HashLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import Head from "next/head";

const UserView = () => {
  const router = useRouter();
  const username = router.query["userId"];

  const { data: fetchedUser, isLoading } = useUser(username as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="grid place-content-center h-screen">
        <HashLoader color="#8b5cf6" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {fetchedUser.name} (@{username}) / assync
        </title>
      </Head>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero id={fetchedUser?.username} />
      <UserBio id={fetchedUser?.username} />
      <PostFeed userId={fetchedUser?.id} />
    </>
  );
};

export default UserView;
