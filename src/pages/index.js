import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Auth</title>
      </Head>

      <main className={styles.main}>
        <h1>Hello {session?.user?.username || "Unknown"}</h1>
        {status == "unauthenticated" ? <button onClick={() => signIn()}>Sign in</button> : <button onClick={() => signOut()}>Sign Out</button>}
      </main>
    </div>
  );
}
