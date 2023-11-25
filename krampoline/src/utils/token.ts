import { User } from "../context/AuthContext";

export function getToken(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    return part && part.split(";").shift();
  }
}

export function decodeToken(token: string): User | null {
  const [_, payloadEncoded] = token.split(".");

  const payloadStr = atob(payloadEncoded);

  const payloadObj = JSON.parse(payloadStr);

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (payloadObj.exp && payloadObj.exp < currentTimestamp) {
    return null;
  }

  return payloadObj;
}
