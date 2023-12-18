import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    useEffect(() => {
      const isAuthenticated = window.localStorage.getItem("loggedUser");
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, []);

    return (
      <main>
        <Component {...props} />
      </main>
    );
  };
}
