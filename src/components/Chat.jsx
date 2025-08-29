import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const fetchMsg = async () => {
    try {
      const res = await axios.get(BASE_URL + "chat/" + toUserId+"/", {
        withCredentials: true,
      });

      const chatMessages = res?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text: text,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      if(err.status === 500){
        alert("You must be friends to chat with peoples!")
        navigate("/")
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
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
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
  if (!user) return;
  return (
    <div className="mt-2 h-[100vh]">
      <div className="border border-gray-500 rounded-lg p-4 md:w-3/6 mx-auto flex flex-col h-[90%]">
        {/* messages */}
        <div className="flex-1 overflow-y-scroll">
          {messages.map((msg, index) => {
            return (
              <div
                key={index}
                className={
                  user?.firstName === msg?.firstName
                    ? "chat chat-end"
                    : "chat chat-start"
                }
              >
                {/* <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div> */}
                <div className="chat-header">
                  {`${msg?.firstName}  ${msg?.lastName}`}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble text-white">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
        </div>
        {/* input box and send button */}
        <form
          onSubmit={(e) => sendMessage(e)}
          className=" flex px-2 justify-between mt-20 bottom-1"
        >
          <input
            type="text"
            placeholder="Type here"
            className=" rounded-lg w-10/12 input input-primary"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <button
            className="btn btn-active btn-accent"
            onClick={(e) => sendMessage(e)}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
