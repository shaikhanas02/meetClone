import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () =>{
    const socket = useContext(SocketContext)
    return socket 
} 


export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const connection = io();
    console.log('socket connection', connection);
    setSocket(connection);
  }, []);
 
  socket?.on('connect_error', async(error)=> {
    console.log("Error establishing socket", error);
    await fetch('/api/socket')
  })
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
