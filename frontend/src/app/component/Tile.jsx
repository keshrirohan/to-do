import { Trash2, Check } from "lucide-react";
import React, { useEffect, useState } from "react";

const Tile = ({ id, Title, fetchData }) => {
  const [isdone, setisDone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!result.ok) {
        throw new Error("Delete failed");
      }

      const data = await result.json();
      console.log("Task Deleted:", data);

      // Delay to show animation before removing
      setTimeout(() => {
        fetchData();
      }, 300);
    } catch (error) {
      console.log("Error deleting task:", error);
      setIsDeleting(false);
    }
  };

  const handleupdate = async (e) => {
    e.stopPropagation();

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !isdone }),
        },
      );
      if (!result.ok) {
        throw new Error("Update failed");
      }
      const data = await result.json();
      console.log("Task Updated:", data);
      setisDone(!isdone);
      fetchData();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div
      id={id}
      onClick={handleupdate}
      className={`
        group relative overflow-hidden
        border-2 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5
        rounded-2xl shadow-md hover:shadow-2xl 
        transition-all duration-300 ease-out
        cursor-pointer
        ${
          isdone
            ? "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300"
            : "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 border-amber-600 hover:from-amber-500 hover:to-orange-600"
        }
        ${isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        transform hover:scale-[1.02] active:scale-[0.98]
        w-full max-w-3xl
      `}
    >
      {/* Animated background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Checkbox indicator */}
      <div
        className={`
          flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 
          flex items-center justify-center
          transition-all duration-300
          ${
            isdone
              ? "bg-green-500 border-green-600 scale-100"
              : "bg-white/30 border-white/50 group-hover:border-white/80"
          }
        `}
      >
        {isdone && (
          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-in zoom-in duration-200" />
        )}
      </div>

      {/* Task title */}
      <div
        className={`
          flex-1 text-lg sm:text-xl md:text-2xl font-semibold
          transition-all duration-300
          ${isdone ? "line-through text-gray-500" : "text-white drop-shadow-sm"}
        `}
      >
        {Title}
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className={`
          flex-shrink-0 p-2 sm:p-2.5 rounded-xl
          transition-all duration-200
          ${
            isdone
              ? "bg-red-400 hover:bg-red-500 border-red-500"
              : "bg-red-500 hover:bg-red-600 border-red-600"
          }
          border-2 shadow-md hover:shadow-lg
          transform hover:scale-110 active:scale-95
          group/delete
        `}
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover/delete:rotate-12 transition-transform duration-200" />
      </button>

      {/* Completion indicator ripple */}
      {isdone && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-green-400/10 animate-ping rounded-2xl"
            style={{ animationDuration: "1s", animationIterationCount: "1" }}
          />
        </div>
      )}
    </div>
  );
};

export default Tile;
