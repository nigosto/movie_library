import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch(`http://localhost:3000/api/movie/${id}`);
    const data = await res.json();

    return {
      props: {
        error: false,
        movie: data.movie,
      },
    };
  } catch (error) {
    return {
        props: {
            error: true,
            movie: null
        }
    }
  }
}

export default function Movie({ error, movie }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (error) {
      router.replace("/404");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const loaderProp =({ src }) => {
    return src;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.movieSection} key={movie.name}>
      <h3>{movie.name}</h3>
      <p>{movie.description}</p>
      <span>{movie.genre}</span>
      <span>{movie.producer}</span>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={movie.image} fill alt={movie.name} loader={loaderProp} />
      </div>
    </section>
  );
}
