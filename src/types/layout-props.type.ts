import { ReactNode } from "react";

export type NavParams = {
  icon: ReactNode;
  text: string;
  navigatePath: string;
}

export type LayoutProps = {
  children: ReactNode;
  nav: Array<NavParams>;
  title: string;
};