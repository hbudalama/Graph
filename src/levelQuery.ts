interface IEngineQuery {
    query: string;
    variables?: {};
  }

  export interface ILevelQuery {
    level: { amount: number }[];
  }

  const LEVEL_QUERY =
  `query level($userLogin: String!) {
    xp: transaction_aggregate(
      where: {
        userLogin: { _eq: $userLogin }
        type: { _eq: "xp" }
      }
    ) { aggregate { sum { amount } } }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        userLogin: { _eq: $userLogin }
        type: { _eq: "level" }
      }
    ) { amount }
  }`;


  export async function fetchLevel(userLogin: string): Promise<ILevelQuery | Error> {
    const url = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';
    
    const query: IEngineQuery = {
        query: LEVEL_QUERY,
        variables: { userLogin },
      };
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
              'Content-Type': 'application/json'
            }
          });
  
      const result = await response.json();
  
      if (result.errors) {
        throw new Error(`Error fetching level data: ${result.errors[0].message}`);
      }
      console.log(result)
      return result.data; // Return the level data
    } catch (error) {
      console.error("Error fetching level data:", error);
      return new Error(`Failed to fetch progress: ${error instanceof Error ? error.message : 'Unknown error'}`);    }
  }