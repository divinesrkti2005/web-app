import { type FC } from "react";

const Greetings: FC<{
  greetings: string;
  length: number;
}> = ({ greetings, length }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{greetings},</h1>
      <p className="text-2xl text-slate-400">
        {length > 0
          ? `It's ${Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            }).format(new Date())} - ${length} task`
          : "No more tasks. Enjoy your day."}
      </p>
    </div>
  );
};

export default Greetings;
