import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/movie/all", {
    headers: {
      cookie: context.req.headers.cookie || "",
    }});

  if(!res.ok) {
    return {
      props:{}
    }
  }
  const data = await res.json();
  
  return {
    props: {
      movies: data.movies,
    },
  };
}

export default function Home({ movies }) {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Auth</title>
      </Head>

      <main className={styles.main}>
        <h1>Hello {session?.user?.username || "Unknown"}</h1>
        {status == "unauthenticated" ? (
          <button onClick={() => signIn()}>Sign in</button>
        ) : (
          <button onClick={() => signOut()}>Sign Out</button>
        )}
        {movies?.map((movie) => {
          return (
            <section className={styles.movieSection} key={movie.name}>
              <h3>{movie.name}</h3>
              <p>{movie.description}</p>
              <span>{movie.genre}</span>
              <span>{movie.producer}</span>
              <div className={styles.imageContainer}>
                <Image className={styles.image} src={movie.image} fill alt={movie.name} />
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
