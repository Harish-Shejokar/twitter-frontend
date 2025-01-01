import { graphql } from "@/gql";


export const getAllTweetQuery = graphql(`#graphql
        query GetAllTweets{
            getAllTweets{
                id
                imageUrl
                content
                author {
                    firstName
                    lastName 
                    profileImageUrl
                }
            }
        }
    `)