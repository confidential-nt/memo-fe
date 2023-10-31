import { SwipeableDrawer } from "@mui/material";
import "./Drawer.css";

type Props = {
  children: React.ReactElement;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
  open: boolean;
  className?: string;
};

export default function Drawer({
  children,
  onClose,
  onOpen,
  open,
  className,
}: Props) {
  return (
    <SwipeableDrawer
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      anchor="right"
      className={`${className}`}
    >
      {children}
    </SwipeableDrawer>
  );
}
