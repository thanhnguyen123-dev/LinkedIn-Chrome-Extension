import { getCookie, getCsrfToken } from "./background";

const CONNECTION_URL = "https://www.linkedin.com/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=40&q=search&sortType=RECENTLY_ADDED&start=0";

export const fetchConnections = async () => {
  const [cookie, csrfToken] = await Promise.all([getCookie(), getCsrfToken()]);

  
  return fetch(CONNECTION_URL, {
    method: "GET",
    headers: {
      "Accept": "application/vnd.linkedin.normalized+json+2.1+*",
      "Cookie": cookie || '',
      "Csrf-Token": csrfToken || '',
      "X-Restli-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",

    }
  })
  .then(async (response) => {
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("LinkedIn connections data:", data);
    return data;
  })
  .catch((error) => {
    console.error("Error fetching LinkedIn connections:", error);
    throw error;
  });
};
