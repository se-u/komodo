import { useState } from "react";
import NotificationTop from "../ui/notification";
import AuthContext from "../auth-context";

export default function NavNotification() {
  const authContext = useState(null);
  const voteContext = useState(null);
  console.log(authContext)
  return (
    <>
      <AuthContext.Provider value={authContext}>
        <NotificationTop />
      </AuthContext.Provider>
    </>
  );
}
