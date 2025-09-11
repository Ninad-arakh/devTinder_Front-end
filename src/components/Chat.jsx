import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { timeAgo } from "../utils/timeAgo";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const fetchMsg = async () => {
    try {
      const res = await axios.get(BASE_URL + "chat/" + toUserId + "/", {
        withCredentials: true,
      });

      const chatMessages = res?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text: text,
          createdAt: msg.createdAt,
          photoUrl: senderId?.photoUrl,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      if (err.status === 500) {
        alert("You must be friends to chat with peoples!");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchMsg();
  }, []);

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user?.firstName, userId, toUserId });

    socket.on("messageRecieved", ({ firstName, lastName, text }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, createdAt: new Date().toISOString() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, toUserId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      toUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  if (!user) return null;

  return (
    <div className="pt-2 h-[100vh] flex flex-col bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      <div className="border border-white/20 shadow-2xl rounded-2xl p-4 md:w-3/6 w-full mx-auto flex flex-col h-[90%] backdrop-blur-lg bg-white/10">
        {/* messages */}
        <div className="flex-1 overflow-y-scroll space-y-4 p-2">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  user?.firstName === msg?.firstName
                    ? "chat chat-end"
                    : "chat chat-start"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full ring ring-pink-400 ring-offset-2">
                    <img
                      alt="user avatar"
                      src={
                        user?.firstName === msg?.firstName
                          ? msg.photoUrl
                            ? msg.photoUrl
                            : user.photoUrl
                          : msg.photoUrl
                          ? msg.photoUrl
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header flex items-center gap-2">
                  <span className="font-semibold text-pink-200">
                    {msg.firstName}
                  </span>
                  <time className="text-xs text-white/70">
                    {timeAgo(msg.createdAt)}
                  </time>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`chat-bubble text-white shadow-md backdrop-blur-md ${
                    user?.firstName === msg?.firstName
                      ? "bg-gradient-to-r from-purple-600 to-pink-500"
                      : "bg-white/20"
                  }`}
                >
                  {msg.text}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* input box and send button */}
        <form
          onSubmit={sendMessage}
          className="flex px-2 py-3 justify-between items-center border-t border-white/20 gap-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="rounded-xl w-10/12 px-4 py-2 bg-white/20 text-white placeholder-white/60 
                       focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 
                       text-white font-medium shadow-lg"
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
