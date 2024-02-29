import { ReactElement } from "react";
import TreeViewContextProvider from "../../../context/TreeViewContext";

type Props = {
  children: ReactElement;
};

export default function TreeViewMain({ children }: Props) {
  return <TreeViewContextProvider>{children}</TreeViewContextProvider>;
}
