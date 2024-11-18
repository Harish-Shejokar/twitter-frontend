import React from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";


const FeedCard: React.FC = () => {
  return (
    <div className="border px-4 py-4 hover:bg-[#0e1012] cursor-pointer border border-[#2f3336]">
      <div className="grid grid-cols-12 ">
        <div className="col-span-1 ">
          <Image
            src="https://avatars.githubusercontent.com/u/90904311?s=400&u=b888162ea56f043666a67f2b45fe53e11c55f545&v=4"
            width={50}
            height={50}
            alt="Picture of the author"
            className="rounded-full"
          />
        </div>
        <div className="col-span-11 mx-[-6px] ">
          {/* heading-of-card */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="font-semibold">Name</span>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci
              augue, laoreet vel consequat eget, pulvinar ac arcu. Maecenas a
              neque quis quam faucibus laoreet. In quis consectetur lectus. Cras
              tempus est eget sem gravida rhoncus. Ut dictum nulla sagittis,
              egestas purus eget, molestie sapien. Fusce varius, sem vitae
              rhoncus fringilla, mi lectus auctor leo, eu tempor eros felis eu
              lectus. Vestibulum vel lacus eros. In sed arcu at ex auctor
              convallis. Donec a tempus magna, ac rutrum nisl. Suspendisse
              gravida sagittis viverra. Nam viverra, sapien sed aliquet laoreet,
              arcu mauris fringilla purus, et accumsan turpis orci id nulla. Sed
              iaculis velit in metus commodo, eu fermentum erat elementum. Sed
              eget porttitor lectus, non sagittis turpis. Duis auctor egestas
              molestie. In hac habitasse platea dictumst. In sed magna auctor,
              luctus felis facilisis, consequat enim. Fusce vulputate, quam vel
              vulputate finibus, metus.
            </p>
            <div></div>
            <div></div>
                  </div>

                  {/* bottom-bar icons */}
                  <div className="flex">
                      <span><TbMessageCircle /></span>
                      <span><FaRetweet /></span>
                      <span><FaRegHeart /></span>
                      <span><PiUploadSimpleBold /></span>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
