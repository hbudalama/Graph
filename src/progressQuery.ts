import { userLogin } from "./userInfo";

interface IEngineQuery {
  query: string;
  variables?: {};
}

export interface IProgressQuery {
  amount: number;
  createdAt: string;
  objectName: string;
}

const PROGRESS_QUERY = `
query progress($userLogin: String!) {
  user(where: { login: { _eq: $userLogin } }) {
    transactions(
      where: {
        type: { _in: ["xp"] }  # Filters for XP transactions
        object: { type: { _eq: "project" } }
      }
      order_by: [{ type: asc }, { amount: asc }]
    ) {
      amount
      createdAt
       object {
        name
      }
    }
  }
}
`;

export async function fetchProgressQuery(userLogin: string): Promise<IProgressQuery[] | Error> {
    const url = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';
    console.log('Fetching progress data for:', userLogin);
  
    const query: IEngineQuery = {
      query: PROGRESS_QUERY,
      variables: { userLogin },
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log('GraphQL Response:', data);
  
      if (data.errors) {
        throw new Error(data.errors.map((error: any) => error.message).join(", "));
      }
  
      // Check if user data exists and if transactions are present
      if (!data.data.user || !data.data.user[0].transactions) {
        console.error('Unexpected GraphQL response structure:', data);
        throw new Error('Unexpected GraphQL response structure. "transactions" field is missing.');
      }
  
      // Access the first user from the returned user array (assuming only one user is expected)
      const transactions = data.data.user[0].transactions;
  
      return transactions.map((transaction: any) => ({
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        objectName: transaction.object.name,
      })) as IProgressQuery[];
  
    } catch (error) {
      console.error("Error fetching progress:", error);
      return new Error(`Failed to fetch progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  

