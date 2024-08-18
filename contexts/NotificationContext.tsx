"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import Confetti from "react-confetti";
type NotificationContextType = {
  showNotification: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const showNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((msg) => msg !== message));
    }, 5000); // Remove notification after 5 seconds
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationDisplay notifications={notifications} />
    </NotificationContext.Provider>
  );
};

type NotificationDisplayProps = {
  notifications: string[];
};

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
  notifications,
}) => (
  <>
    {notifications.length > 0 && <Confetti />}
    <div
      style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1000 }}
    >
      {notifications.map((msg, idx) => (
        <div
          key={idx}
          style={{
            background: "green",
            color: "white",
            padding: "10px",
            marginBottom: "5px",
          }}
        >
          {msg}
        </div>
      ))}
    </div>
  </>
);
