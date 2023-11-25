import { useNavigate } from "react-router-dom";
import { login } from "../service/http-requests/kakao-api";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");

  const { onAuthStateChange } = useAuthContext();

  return (
    <section className="pt-10">
      <p>아래 버튼을 누르면 회원가입이 완전히 완료됩니다!</p>
      <button
        className="pt-10"
        onClick={async () => {
          if (code) {
            const token = await login(code);
            document.cookie = `token=${token as string}; path=/`;
            onAuthStateChange("login");
            navigate("/");
          }
        }}
      >
        로그인 마치기
      </button>
    </section>
  );
}
