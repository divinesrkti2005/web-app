import React, { FC, type MutableRefObject } from "react";
import { Task } from "../App";

const Card: FC<{
  task: Task;
  index: number;
  handleComplete: (id: string) => void;
  handleUpdate: (e: React.FormEvent, index: number) => void;
  handleDelete: (id: string) => void;
  allTasks: MutableRefObject<HTMLInputElement[]>;
}> = ({
  task,
  index,
  handleComplete,
  handleUpdate,
  handleDelete,
  allTasks,
}) => {
  return (
    <div
      key={task.id}
      className="rounded-2xl p-3 mb-4 bg-[#2f343d] flex items-center gap-4"
    >
      <div
        onClick={() => handleComplete(task.id)}
        className={`w-6 h-6 rounded-lg ${
          task.completed ? "bg-white" : "bg-[#494d55]"
        } flex items-center justify-center cursor-pointer`}
      >
        {task.completed && (
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M3.5 8.5L6.5 11.5L12.5 5.5"
              fill="none"
              stroke={"#494d55"}
              strokeWidth={2}
              strokeLinecap="round"
            ></path>
          </svg>
        )}
      </div>
      <div className="flex-1 flex items-center">
        <form onSubmit={(e) => handleUpdate(e, index)} className="flex-1">
          <input
            ref={(el) => {
              if (el) {
                allTasks.current[index] = el;
              }
            }}
            type="text"
            className={`w-full outline-none bg-transparent ${
              task.completed ? "line-through" : ""
            } text-base font-medium`}
            defaultValue={task.title}
          />
        </form>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              allTasks.current[index].focus();
            }}
            className="p-2 border border-transparent hover:border-gray-600 transition duration-150 rounded-md bg-transparent hover:bg-[#393d46]"
          >
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M9 4L10.5 2.5C11.3284 1.67157 12.6716 1.67157 13.5 2.5V2.5C14.3284 3.32843 14.3284 4.67157 13.5 5.5L12 7M9 4L2 11V14H5L12 7M9 4L10.5 5.5L12 7"
                stroke="#fff"
                fill="none"
                strokeWidth="1"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            className="p-2 border border-transparent hover:border-gray-600 transition duration-150 rounded-md bg-transparent hover:bg-[#393d46]"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M3 5H13V11.5C13 13.433 11.433 15 9.5 15H6.5C4.567 15 3 13.433 3 11.5V5Z"
                fill="none"
                stroke={"#fff"}
                stroke-width="1"
              ></path>
              <g>
                <path
                  d="M11 5L5 5L5 4C5 2.34315 6.34315 1 8 1V1C9.65685 1 11 2.34315 11 4L11 5Z"
                  fill="none"
                  stroke={"#fff"}
                  stroke-width="1"
                ></path>
                <path
                  d="M2 5H14"
                  fill="none"
                  stroke-width="1"
                  stroke-linecap="square"
                  stroke={"#fff"}
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
