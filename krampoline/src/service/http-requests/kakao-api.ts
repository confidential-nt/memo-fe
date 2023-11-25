import axios from "axios";
import { KakaoApiRoute } from "../../common/route";

export async function login(code: string) {
  return axios
    .get(KakaoApiRoute.LOGIN(code), {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
    .then((res) => res.data)
    .catch(console.log);
}
