import React, { useCallback, useState } from "react";
import FeedCard from "@/components/feedCard";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { MdOutlineImage } from "react-icons/md";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import TwitterLayout from "@/components/layout/twitterLayout";
import toast from "react-hot-toast";
import { GetServerSideProps } from "next";
import { graphQLClient } from "@/clients/api";
import { getAllTweetQuery } from "@/graphql/query/tweets";
import { Tweet } from "@/gql/graphql";


interface TweetServerProp {
  tweets: Tweet[];
}



export default function Home({tweets}:TweetServerProp) {
  const { user } = useCurrentUser();
  // const { tweets = [] } = useGetAllTweets();
  const [content, setContent] = useState('');
  const { mutate } = useCreateTweet();
  
  const handleCreateTweet = useCallback(() => {
    if (content == "" || content.length == 0) {
      toast.error("Enter Some Text");
      return;
    }
    mutate({ content });
    setContent("");
  }, [content, mutate])


  const imageUploadHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }

  return (
    <div>
      <TwitterLayout>
        {/* post-bar */}
        <div className="border px-4 py-4 hover:bg-[#0e1012] cursor-pointer  border-[#2f3336] ">
          <div className="flex gap-2 ">
            <span>
              {user?.profileImageURL && <Image
                className="rounded-full"
                src={user?.profileImageURL}
                alt="user profile ..."
                width={35}
                height={35}
              />}
            </span>

            <div className="w-full mx-4">
              <div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's happening ?" className="w-full bg-transparent border-0 border-transparent active:border-1 active:border-slate-900 border-b-1 border-slate-400 text-xl" rows={3} />
              </div>

              <div className="flex justify-between items-center px-[10px] mt-4">
                <MdOutlineImage className="text-xl" onClick={imageUploadHandler} />
                <button onClick={handleCreateTweet} className="font-semibold bg-blue-400 py-2 px-4 rounded-full">Tweet</button>
              </div>
            </div>
          </div>

        </div>

        {tweets.map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet} /> : null)}

      </TwitterLayout>
    </div>
  );
}


export const getServerSideProps:GetServerSideProps<TweetServerProp> = async () => {
  const tweets = await graphQLClient.request(getAllTweetQuery);

  return {
    props: {
      tweets: tweets?.getAllTweets,
    }
  }
}