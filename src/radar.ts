const RADAR_QUERY = `query {
    transaction(where: { 
      type: { _like: "skill_%" } 
    }, order_by: {amount: desc}) {
      type
      amount
    }
  }`;

export function fetchRadarData() {
    const url = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql'

    fetch(url)
} 