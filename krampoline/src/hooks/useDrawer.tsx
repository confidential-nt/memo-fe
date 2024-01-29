import { useRecoilState } from "recoil";
import { drawerState } from "../state/atoms";

export default function useDrawer() {
  const [isDrawerOpened, setDrawerOpened] = useRecoilState(drawerState);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpened(open);
    };
  return {
    toggleDrawer,
    isDrawerOpened,
  };
}
