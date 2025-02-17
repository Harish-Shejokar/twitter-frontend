import { graphQLClient } from "@/clients/api";
import FeedCard from "@/components/feedCard";
import TwitterLayout from "@/components/layout/twitterLayout";
import { User } from "@/gql/graphql";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";


interface GetServerProps{
    userInfo : User
}


const UserProfilePage: NextPage<GetServerProps> = (props) => {
    const router = useRouter();


    return (<div>
        <TwitterLayout>
            {/*============ header section ========= */}
            <div>
                {/* nav-bar */}
                <nav className="flex items-center gap-6 px-4 py-2">
                    <BsArrowLeft className="text-2xl" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-2xl">{props.userInfo.firstName}{" "}{props.userInfo.lastName}</span>
                        <span className="text-gray-500">{props.userInfo.tweets.length} Tweet</span>
                    </div>
                </nav>
                {/* banner with profile Icon */}
                <div>
                    {/* banner */}
                    <div className="bg-[#333639] h-[200px]"></div>
                    {/* profile Icon with Edit button */}
                    <div className="flex justify-between items-center px-4 py-2">
                        <Image className="mt-[-80px] rounded-full border-[4px] border-black" src={props?.userInfo?.profileImageURL} alt="profile Image" width={120} height={120} />
                        <button className="text-md border py-2 px-4 rounded-3xl hover:bg-slate-100 hover:text-black">Edit Profile</button>
                    </div>
                </div>
            </div>
            {/* user tweet-section */}
            <div>
                {props?.userInfo?.tweets?.map(tweet=> <FeedCard data={tweet}/>)}
            </div>
        </TwitterLayout>
    </div>);
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const userId = context.query.id;
    if (!userId) {
        return { notFound: true,props:{user:undefined} };
    }
    const userInfo = await graphQLClient.request(getUserByIdQuery, { id: userId });

    if (!userInfo?.getUserById) return { notFound: true };

    return {
        props: {
            userInfo : userInfo?.getUserById
        }
    }
}

export default UserProfilePage;
