import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import { CreatePostForm } from "@/components/Forms";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home / assync</title>
      </Head>
      <Header label="Home" />
      <CreatePostForm />
      <PostFeed />
    </>
  );
}
