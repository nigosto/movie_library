import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Auth</title>
      </Head>

      <main className={styles.main}>
        <h1>Hello {session?.user?.username || "Unknown"}</h1>
        {session?.user ? <span> WELCOME </span> : <Link href="/user/login">Sign In</Link>}
        <button onClick={() => signOut()}>Sign Out</button>
      </main>
    </div>
  );
}
