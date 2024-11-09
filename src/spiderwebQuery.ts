interface IEngineQuery {
  query: string,
  variables?: {}
}

export interface IRadarQuery {
  type: string,
  amount: number
}

const RADAR_QUERY = `query {
  user(where: {}) {
    transactions(
      order_by: [{type: desc}, {amount: desc}]
      distinct_on: [type]
      where: {
        type: {_in: ["skill_js", "skill_go", "skill_html", "skill_prog", "skill_front-end", "skill_back-end"]}
      }
    ) {
      type
      amount
    }
  }
}`;

export async function fetchRadarData(): Promise<IRadarQuery[] | Error> {
  const url = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';

  const query: IEngineQuery = {
    query: RADAR_QUERY,
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

    // Ensure the response has the expected data structure
    if (!result.data || !result.data.user || !Array.isArray(result.data.user) || result.data.user.length === 0 || !result.data.user[0].transactions) {
      console.error("Invalid response structure:", result);
      return new Error("Invalid response structure");
    }

    const transactions = result.data.user[0].transactions; // Access the first user object, then get transactions

    // Return the formatted data
    return transactions.map((item: { type: string, amount: number }) => ({
      type: item.type,
      amount: item.amount,
    }));

  } catch (error) {
    console.error("Error fetching radar data:", error);
    return new Error("Failed to fetch radar data");
  }
}
