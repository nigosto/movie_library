import { useRef } from "react";
import styles from "@/styles/createMovieForm.module.scss";

export default function CreateMovieForm() {
  const nameInputRef = useRef();
  const genreInputRef = useRef();
  const producerInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredGenre = genreInputRef.current.value;
    const enteredProducer = producerInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredImage = imageInputRef.current.value;

    const res = await fetch("http://localhost:3000/api/movie/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: enteredName,
        genre: enteredGenre,
        producer: enteredProducer,
        description: enteredDescription,
        image: enteredImage,
      }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <form className={styles.createMovieForm} onSubmit={handleSubmit}>
      <div className={styles.smallInput}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" ref={nameInputRef} required />
      </div>

      <div className={styles.smallInput}>
        <label htmlFor="genre">Genre: </label>
        <input
          type="text"
          id="genre"
          name="genre"
          ref={genreInputRef}
          required
        />
      </div>

      <div className={styles.smallInput}>
        <label htmlFor="producer">Producer: </label>
        <input
          type="text"
          id="producer"
          name="producer"
          ref={producerInputRef}
          required
        />
      </div>

      <div className={styles.largeInput}>
        <label htmlFor="description">Description: </label>
        <textarea
          type="textarea"
          id="description"
          name="description"
          ref={descriptionInputRef}
          required
        />
      </div>

      <div className={styles.largeInput}>
        <label htmlFor="image">Image: </label>
        <input
          type="text"
          id="image"
          name="image"
          ref={imageInputRef}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
