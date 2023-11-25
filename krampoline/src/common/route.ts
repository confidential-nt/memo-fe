export const BASE_URL = "https://easylog.shop";

export const KakaoApiRoute = {
  LOGIN(code: string) {
    return BASE_URL + `/openApi/kakao?code=${code}`;
  },
};
