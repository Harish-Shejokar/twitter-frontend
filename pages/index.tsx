import React, { useCallback } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import FeedCard from "@/components/feedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface twitterSideBarButton {
  title: string;
  icons: React.ReactNode;
}

const sideBarMenuItem: twitterSideBarButton[] = [
  {
    title: "Home",
    icons: <IoHomeSharp />,
  },
  {
    title: "Explore",
    icons: <IoSearch />,
  },
  {
    title: "Notifications",
    icons: <FaRegBell />,
  },
  {
    title: "Messages",
    icons: <FaRegEnvelope />,
  },
  {
    title: "Grok",
    icons: <MdOutlineCheckBoxOutlineBlank />,
  },
  {
    title: "Bookmarks",
    icons: <FaRegBookmark />,
  },
  {
    title: "Users",
    icons: <FiUsers />,
  },
  {
    title: "Profile",
    icons: <FaRegUser />,
  },
  {
    title: "More",
    icons: <CiCircleMore />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Google token not found..");
      }
      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success..");
      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
        await queryClient.invalidateQueries(["current-user"]);
      }
    },
    [queryClient]
  );

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* ===============Left-bar===============================*/}
      <div className="col-span-3 pl-[200px] relative">
        <div className=" text-4xl px-5 hover:bg-[#202327] rounded-full w-fit p-[18px]">
          <FaXTwitter />
        </div>
        {/* left-bar-icon list */}
        <div className="mt-6">
          <ul className="flex flex-col gap-4">
            {sideBarMenuItem.map((item) => {
              return (
                <li
                  key={item.title}
                  className="flex gap-4 hover:bg-[#202327] rounded-full w-fit px-5 py-3"
                >
                  <span className="text-[26px]">{item.icons}</span>
                  <span className="font-bold text-xl">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        {/* user-profile card----- */}
        {user && (
          <div className="flex items-center gap-x-2 px-5 py-3  rounded-full hover:bg-slate-900 absolute bottom-3 cursor-pointer">
            <span>
              <Image
                className="rounded-full"
                src={user?.profileImageUrl}
                alt="user profile ..."
                width={35}
                height={35}
              />
            </span>
            <div className="text-sm font-bold">
              <span>{user.firstName}</span> <span>{user.lastName}</span>
            </div>
          </div>
        )}
      </div>
      {/* ==================Middle-section========================= */}
      <div className="col-span-6  border-l-[1px] border-r-[1px] border-gray-400 overflow-y-auto ">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>

      {/* ======================right-section===================== */}
      <div className="col-span-3 p-4">
        {!user && (
          <div className=" border p-5 text-center bg-slate-700 rounded-lg ">
            <h2 className="font-bold">New to Twitter ?</h2>
            <div className="flex justify-center mt-2">
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
