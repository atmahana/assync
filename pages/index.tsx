import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import Form from "@/components/Form";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <div className="my-5 mx-3 sm:mx-0 border rounded-lg shadow-sm bg-primary border-border">
        <Form placeholder="Share something..." />
      </div>
      <PostFeed />
    </>
  );
}
