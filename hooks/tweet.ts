import { graphQLClient } from "@/clients/api"
import { getAllTweetQuery } from "@/graphql/query/tweets";
import { useQuery } from "@tanstack/react-query"

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: () => graphQLClient.request(getAllTweetQuery),
    });
    return { ...query, tweets: query?.data?.getAllTweets };
}