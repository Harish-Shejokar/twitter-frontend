import React, { useCallback, useMemo,  } from "react";
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
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";


interface twitterSideBarButton {
  title: string;
  icons: React.ReactNode;
  link: string;
}



interface TwitterLayoutProps {
  children: React.ReactNode
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();


  const sideBarMenuItem: twitterSideBarButton[] = useMemo(() => [
    {
      title: "Home",
      icons: <IoHomeSharp />,
      link: "/",
    },
    {
      title: "Explore",
      icons: <IoSearch />,
      link: "/",
    },
    {
      title: "Notifications",
      icons: <FaRegBell />,
      link: "/",
    },
    {
      title: "Messages",
      icons: <FaRegEnvelope />,
      link: "/",
    },
    {
      title: "Grok",
      icons: <MdOutlineCheckBoxOutlineBlank />,
      link: "/",
    },
    {
      title: "Bookmarks",
      icons: <FaRegBookmark />,
      link: "/",
    },
    {
      title: "Users",
      icons: <FiUsers />,
      link: "/",
    },
    {
      title: "Profile",
      icons: <FaRegUser />,
      link: `/${user?.id}`,
    },
    {
      title: "More",
      icons: <CiCircleMore />,
      link: "/",
    },
  ], [user?.id,])
  

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
    <div>
      <div className="grid grid-cols-12 h-screen">
        {/* ===============Left-bar===============================*/}
        <div className="hidden sm:flex sm:justify-center  sm:col-span-2 lg:col-span-3">
        <div className=" relative">
          <div className=" text-4xl px-5 hover:bg-[#202327] rounded-full w-fit p-[18px]">
            <FaXTwitter />
          </div>
          {/* left-bar-icon list */}
          <div className="mt-6">
            <ul className="flex flex-col gap-4">
              {sideBarMenuItem.map((item) => {
                return (
                  
                  <Link
                    key={item.title}
                    className="flex gap-4 hover:bg-[#202327] rounded-full w-fit px-5 py-3"
                    href={item.link}
                  >
                    <span className="text-[26px]">{item.icons}</span>
                    <span className="font-bold text-xl hidden lg:block">{item.title}</span>
                    </Link>
                   
                );
              })}
            </ul>
          </div>
          {/* user-profile card----- */}
          {user && (
            <div className="flex items-center gap-x-2 px-5 py-3  rounded-full hover:bg-slate-900 absolute bottom-3 cursor-pointer">
              <span>
                {user?.profileImageURL && <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user profile ..."
                  width={35}
                  height={35}
                />}
              </span>
              <div className="text-sm font-bold hidden lg:block">
                <span>{user.firstName}</span> <span>{user.lastName}</span>
              </div>
            </div>
          )}
          </div>
          </div>
        {/* ==================Middle-section========================= */}
        <div className="col-span-12 sm:col-span-10 lg:col-span-6  border-l-[1px] border-r-[1px] border-gray-400 overflow-y-scroll">
          {props.children}
        </div>

        {/* ======================right-section===================== */}
        <div className="lg:col-span-3 p-4 lg:p-0  hidden lg:block">
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
    </div>);
}

export default TwitterLayout;