import { SessionProvider } from "next-auth/react";
import "../styles/typography.scss";
import "../styles/globals.css";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
