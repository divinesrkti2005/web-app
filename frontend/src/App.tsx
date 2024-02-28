import { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import Greetings from "./components/Greetings";
import Loading from "./components/Loading";
import useGreetings from "./hooks/useGreetings";
import useOnClickOutside from "./hooks/useOnClickOutside";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

function App() {
  const greetings = useGreetings();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputActive, setInputActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`);
        const data = await res.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert("Failed to fetch data from server.");
      }
    })();
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    setInputActive(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = inputRef.current?.value;

    if (value) {
      setTasks((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          title: value,
          completed: false,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      inputRef.current!.value = "";

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      await res.json();
    }
  };

  const allTasks = useRef<HTMLInputElement[]>([]);

  const handleUpdate = async (e: React.FormEvent, index: number) => {
    e.preventDefault();

    const value = allTasks.current[index].value;

    if (value) {
      setTasks((prev) => {
        const newTasks = [...prev];
        newTasks[index].title = value;
        return newTasks;
      });

      allTasks.current[index].blur();

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: tasks[index].id, title: value }),
      });

      await res.json();
    }
  };

  const handleDelete = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    await res.json();
  };

  const handleComplete = async (id: string) => {
    const isCompleted = tasks.find((task) => task.id === id)!.completed;
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      })
    );

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        completed: !isCompleted,
      }),
    });

    await res.json();
  };

  return (
    <section className="app">
      <div className="overlay-1"></div>
      <div className="overlay-2"></div>
      <div className="overlay-3"></div>

      <div className="py-28 max-w-[600px] w-full mx-auto px-4">
        <Greetings
          greetings={greetings}
          length={tasks.filter((task) => !task.completed).length}
        />

        <div
          ref={ref}
          onClick={() => {
            setInputActive(true);
            inputRef.current?.focus();
          }}
          className={`rounded-2xl mb-6 p-3 bg-[#2f343d] ${
            inputActive ? "opacity-100" : "opacity-75 hover:opacity-100"
          } transition duration-100 cursor-pointer flex items-center gap-4`}
        >
          <div
            className={`animation-input-checkbox transition duration-150 w-6 h-6 rounded-lg bg-[#494d55]`}
          ></div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between flex-1"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Create new task."
              className={`bg-transparent flex-1 text-base outline-none ${
                inputActive ? "" : "cursor-pointer"
              }`}
            />
            {inputActive && (
              <kbd className="text-xs text-slate-400 block mt-1">
                Press Enter
              </kbd>
            )}
          </form>
        </div>

        <div className="w-full h-[1px] mb-6 bg-[#2f343d]" />
        <p className="text-sm text-slate-200 mb-2">ON GOING</p>
        {loading ? (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        ) : tasks.length > 0 ? (
          <>
            {tasks.filter((e) => !e.completed).length > 0 ? (
              tasks
                .filter((e) => !e.completed)
                .map((task, index) => (
                  <Card
                    key={task.id}
                    task={task}
                    index={index}
                    handleComplete={handleComplete}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    allTasks={allTasks}
                  />
                ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-lg text-slate-200 font-medium">
                  No on going tasks.
                </p>
              </div>
            )}

            {tasks.filter((e) => e.completed).length > 0 && (
              <>
                <div className="w-full h-[1px] my-6 bg-[#2f343d]" />
                <p className="text-sm text-slate-200 mb-2">COMPLETED</p>
              </>
            )}
            {tasks
              .filter((e) => e.completed)
              .map((task, index) => (
                <Card
                  key={task.id}
                  task={task}
                  index={index}
                  handleComplete={handleComplete}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  allTasks={allTasks}
                />
              ))}
          </>
        ) : (
          <div className="py-32 text-center">
            <p className="text-2xl text-slate-200 font-medium">
              You are all done.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
