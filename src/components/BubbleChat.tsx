import {
  CloseOutlined,
  SendOutlined,
  SmileOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { useState } from "react";

import EmojiPicker from "emoji-picker-react";
import "./BubbleChat.scss";

type Chat = {
  user: 1 | 2;
  message: string;
};

const userPhotoUrl = "https://picsum.photos/32/32";

const BubbleChat = () => {
  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [sending, setSending] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      user: 2,
      message: "No story?",
    },
    {
      user: 1,
      message: "No forget the story",
    },
  ]);

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpenEmoji(false);
    if (!message) {
      return;
    }

    const newChats: Chat[] = [...chats, { user: 1, message: message }];
    setChats(newChats);
    setMessage("");
    setSending(true);

    setTimeout(() => {
      setChats([...newChats, { user: 2, message: `${message} by other side` }]);
      setSending(false);
    }, 1000);
  };

  return (
    <div className="BubbleChat">
      <div
        className="BubbleChat-chat"
        style={{ display: openChat ? "flex" : "none" }}
      >
        <div className="BubbleChat-chat__header">
          <div className="BubbleChat-chat__header-info">
            <img
              src={userPhotoUrl}
              alt="avatar"
              className="BubbleChat-chat__header-info__avatar"
            />
            react-live-chat
          </div>
          <CloseOutlined
            className="BubbleChat-chat__header-close"
            onClick={() => setOpenChat(!openChat)}
          />
        </div>
        <div className="BubbleChat-chat__body">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`BubbleChat-chat__body-message ${
                index === 0 ? "firstMessage" : ""
              } 
            ${index === chats.length - 1 ? "lastMessage" : ""}`}
            >
              {chat.user === 2 ? (
                <img
                  src={userPhotoUrl}
                  alt="avatar"
                  className="BubbleChat-chat__body-message__avatar"
                />
              ) : null}
              <div
                className={`${
                  chat.user === 2 ? "messageLeft" : "messageRight"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
          {sending && <Skeleton avatar paragraph={{ rows: 0 }} />}
        </div>

        {openEmoji && (
          <EmojiPicker
            searchDisabled
            skinTonesDisabled
            width={320}
            height={"640px"}
            onEmojiClick={(emoji) => setMessage(message + emoji.emoji)}
          />
        )}
        <form className="BubbleChat-chat__footer" onSubmit={handleSendMessage}>
          <input
            className="BubbleChat-chat__footer-input"
            placeholder="Write your reply..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="BubbleChat-chat__footer-send">
            <SmileOutlined onClick={() => setOpenEmoji(!openEmoji)} />
            <SendOutlined
              disabled={message.length === 0}
              onClick={handleSendMessage}
            />
          </div>
        </form>
      </div>

      <button
        className="BubbleChat-button"
        onClick={() => setOpenChat(!openChat)}
      >
        {openChat ? <CloseOutlined /> : <WechatOutlined />}
      </button>
    </div>
  );
};

export default BubbleChat;
