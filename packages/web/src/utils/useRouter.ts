import { useContext } from "react";
// @ts-ignore
import { __RouterContext } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export default function useRouter() {
  return useContext<RouteComponentProps>(__RouterContext);
}
