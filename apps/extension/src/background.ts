
console.log("Background script loaded");


export const getCookie = async (): Promise<string | null> => {
  try {
    const cookies = await getCookies();

    const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
    console.log("cookie:", cookieString);
    return cookieString;
  } catch (error) {
    console.error(`Error getting cookie`, error);
    throw error;
  }
};

const getCookies = async () => {
  return chrome.cookies.getAll({
    domain: "linkedin.com",
  });
}

export const getCsrfToken = async (): Promise<string | null> => {
  try {
    const cookie = await chrome.cookies.get({
      url: "https://www.linkedin.com",
      name: "JSESSIONID",
    });
    if (!cookie) {
      console.error('JSESSIONID cookie not found');
      return null;
    }
    const token = cookie.value.replace(/^"|"$/g, "");
    console.log("CSRF token:", token);
    return token;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    throw error;
  }
};

