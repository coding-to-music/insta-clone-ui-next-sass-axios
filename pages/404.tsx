import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  router.push("/");
  return null;
}
