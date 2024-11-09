interface IEngineQuery {
  query: string;
  variables?: {};
}

const USERINFO_QUERY = `
        query GetTitleData($userlogin: String) {
            user(where: { login: { _eq: $userlogin } }) {
                firstName,
            		email
            }
        }
    
`;
