import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Banner = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axios.get("user", {
          signal: controller.signal,
        });
        console.log(response.data);
        mounted && setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>{user?.name}</p>
    </div>
  );
};

export default Banner;
