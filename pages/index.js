import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const [live, setLive] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/twitter/${username}`);
    const { data } = await response.json();
    setUserData(data);
    setLive(true);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>twideck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>twideck</h1>

        <p className={styles.description}>visualize your tweet data!</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="sm:flex">
            <input
              className={"form-input border p-2 mt-4 rounded-l text-gray-600 "}
              id="username"
              type="text"
              placeholder="@username"
              onChange={(e) => handleChange(e)}
            />
            <button
              type="submit"
              className="p-2 px-4 mt-4 border border-transparent  rounded-r text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
            >
              Let's go!
            </button>
          </div>
        </form>
        {live && (
          <div>
            <p>{userData.name}</p>
            <p>{userData.username}</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
