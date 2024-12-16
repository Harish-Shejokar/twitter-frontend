import { graphQLClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"



export const useCurrentUser = async ()=> {

    const query =  useQuery({
        queryKey: ['current-user'],
        queryFn: () =>   graphQLClient.request(getCurrentUserQuery),
    })

    // console.log('query', query)
   
    return {...query, user : query.data?.getCurrentUser || null}
}
    


