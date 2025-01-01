import React from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps{
  data: Tweet
}


const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className="border px-4 py-4 hover:bg-[#0e1012] cursor-pointer  border-[#2f3336]">
      <div className="grid grid-cols-12 ">
        <div className="col-span-1 ">
          {data.imageUrl ? <Image
            src={data.imageUrl}
            width={50}
            height={50}
            alt="Picture of the author"
            className="rounded-full"
          /> : null}
        </div>
        <div className="col-span-11 mx-[-6px] ">
          {/* heading-of-card */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="font-semibold">`${data.firstName} ${data.lastName}`</span>
              {/* <span className="">icons</span> */}
              <span className="text-gray-500">@somthing</span>
              {/* <span>.</span> */}
              <span className="text-gray-500">8h</span>
            </div>
            <div className="text-gray-500">
              <BsThreeDots />
            </div>
          </div>
          {/* description-of-card: text, img, links etc */}
          <div className="w-full">
            <p className="w-[90%]  ">
              {data.content}
            </p>
          </div>

          {/* bottom-bar icons */}
          <div className="flex justify-between px-[0px] w-[90%] mt-4">
            <span className="text-lg">
              <TbMessageCircle />
            </span>
            <span className="text-lg">
              <FaRetweet />
            </span>
            <span className="text-lg">
              <FaRegHeart />
            </span>
            <span className="text-lg">
              <PiUploadSimpleBold />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
