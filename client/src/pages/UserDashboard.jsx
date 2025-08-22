import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Bell,
} from "lucide-react"; // icons

const UserDashboard = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Chats", icon: <MessageSquare size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-lg flex flex-col"
      >
        <div className="p-6 text-center border-b">
          <h2 className="text-2xl font-bold text-primary">ChatApp 🚀</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl text-gray-700 hover:bg-primary/10 ${
                active === item.name ? "bg-primary text-white" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-red-600 hover:bg-red-50">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <h1 className="text-xl font-semibold">{active}</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-medium">Ayush</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {active === "Dashboard" && (
            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <h2 className="text-3xl font-bold mb-2">
                Welcome to your Dashboard 🎉
              </h2>
              <p className="text-gray-600">
                You have successfully logged in and verified your account.
              </p>
            </div>
          )}

          {active === "Chats" && (
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-4">Your Chats 💬</h2>
              <p className="text-gray-600">
                This is where your conversations will appear.
              </p>
            </div>
          )}

          {active === "Profile" && (
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-4">Profile 👤</h2>
              <p className="text-gray-600">User details and edit options.</p>
            </div>
          )}

          {active === "Settings" && (
            <div className="bg-white p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-4">Settings ⚙️</h2>
              <p className="text-gray-600">
                Customize your account preferences here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
