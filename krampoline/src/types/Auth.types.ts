export type AuthenticatedUser = {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  thumbnailImage: string;
};

export type AuthStateChangeType = "login" | "logout";

export interface AuthContextProps {
  onAuthStateChange: (type: AuthStateChangeType) => void;
  user: AuthenticatedUser | undefined | null;
  isInitializing: boolean;
}
