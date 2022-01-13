import { useEffect } from "react";
import { useRouter } from "next/router";
import Error from "next/error";

export default function ResolveRoute() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === router.pathname.toLowerCase()) {
      router.push("/404");
    } else {
      router.push(router.pathname.toLowerCase());
    }
  });

  return <p>Redirecting...</p>;
}
