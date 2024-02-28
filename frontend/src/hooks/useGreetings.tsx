import React, { useLayoutEffect } from "react";

const useGreetings = () => {
  const [greetings, setGreetings] = React.useState("Good Morning!");

  useLayoutEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
      setGreetings("Good Morning!");
    } else if (hours < 18) {
      setGreetings("Good Afternoon!");
    } else {
      setGreetings("Good Evening!");
    }
  }, []);

  return greetings;
};

export default useGreetings;
