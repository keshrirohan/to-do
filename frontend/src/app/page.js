"use client";
import { Plus, CheckCircle2, ListTodo, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Tile from "./component/Tile";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchData = async () => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/`, {
        method: "GET",
      });
      const result = await data.json();
      setTasks(result);
      console.log("Fetched Data:", result);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    setIsAdding(true);

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: taskInput }),
      });

      const data = await result.json();
      setTaskInput("");
      console.log("Task Created:", data);
      fetchData();
    } catch (error) {
      console.log("Error creating task:", error);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/40 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative flex flex-col items-center justify-start min-h-screen p-6 sm:p-12 lg:p-24 gap-8 sm:gap-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
              <ListTodo className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Organize your day, one task at a time ✨
          </p>

          {/* Stats Bar */}     
          {totalTasks > 0 && (
            <div className="flex items-center justify-center gap-6 mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md border border-white/40 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-medium">Completed</p>
                  <p className="text-lg font-bold text-gray-800">
                    {completedTasks}/{totalTasks}
                  </p>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 font-medium">
                    Progress
                  </span>
                  <span className="text-xs font-bold text-amber-600">
                    {Math.round((completedTasks / totalTasks) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form - INCREASED HEIGHT */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom duration-700 delay-200"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative flex gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-gray-100">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-grow px-6 py-5 sm:py-6 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-lg sm:text-xl font-medium"
                disabled={isAdding}
              />
              <button
                type="submit"
                disabled={isAdding || !taskInput.trim()}
                className="px-6 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
              >
                {isAdding ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Adding...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    <span className="hidden sm:inline">Add Task</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Tasks Grid */}
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-gray-500 font-medium">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                <Sparkles className="w-12 h-12 text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700">
                No tasks yet
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                Start your productive day by adding your first task above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tasks.map((item, index) => (
                <div
                  key={item._id}
                  className="animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Tile
                    fetchData={fetchData}
                    id={item._id}
                    Title={item.title}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="text-center text-sm text-gray-400 mt-8">
            Keep going! You're doing great 🌟
          </div>
        )}
      </div>
    </main>
  );
}
