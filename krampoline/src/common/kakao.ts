export const REDIRECT_URI = "http://localhost:5173/openApi/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_OAUTH_CLIENT_ID
}&redirect_uri=${REDIRECT_URI}&response_type=code`;
