"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { Menu } from "@/src/data/menu";
import { setMenu } from "@/lib/features/menu/menuSlice";

export default function StoreProvider({
  menu,
  children,
}: {
  menu: Menu;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setMenu(menu));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
