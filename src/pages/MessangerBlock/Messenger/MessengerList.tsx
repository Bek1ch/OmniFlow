import React, { useState } from "react";
import "./MessengerList.css";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  hasUnread: boolean;
  isRead: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  isRead: boolean;
}

const MessengerList: React.FC = () => {
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Сагира Жандарбеко...",
      avatar: "👤",
      lastMessage:
        "Сложно сказать, почему активно развивающиеся страны третьего мир...",
      time: "10:43",
      isOnline: true,
      hasUnread: true,
      isRead: false,
    },
    {
      id: 2,
      name: "Константин Констан...",
      avatar: "👤",
      lastMessage:
        "Надо отправить отчёт за прошедший квартал, будет так же АВР по процессам...",
      time: "10:43",
      isOnline: false,
      hasUnread: false,
      isRead: true,
    },
    {
      id: 3,
      name: "Жанат Даулетбеков",
      avatar: "👤",
      lastMessage:
        "Сложно сказать, почему активно развивающиеся страны третьего мира...",
      time: "10:43",
      isOnline: true,
      hasUnread: false,
      isRead: false,
    },
    {
      id: 4,
      name: "Ирина Маслякова",
      avatar: "👤",
      lastMessage:
        "Сложно сказать, почему активно развивающиеся страны третьего мира...",
      time: "10:43",
      isOnline: false,
      hasUnread: false,
      isRead: true,
    },
    {
      id: 5,
      name: "Самат Токишев",
      avatar: "👤",
      lastMessage:
        "Сложно сказать, почему активно развивающиеся страны третьего мира...",
      time: "10:43",
      isOnline: false,
      hasUnread: false,
      isRead: true,
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      text: "Добрый день! Мне надо подписать АВР.",
      time: "06:00",
      isOwn: true,
      isRead: true,
    },
    {
      id: 2,
      text: "Добрый день! Мне надо подписать АВР.",
      time: "06:00",
      isOwn: true,
      isRead: true,
    },
    {
      id: 3,
      text: "Добрый день! Мне надо подписать АВР.",
      time: "06:00",
      isOwn: true,
      isRead: true,
    },
    {
      id: 4,
      text: "Добрый день! Мне надо подписать АВР.",
      time: "06:00",
      isOwn: true,
      isRead: true,
    },
    {
      id: 5,
      text: "Наше дело не так однозначно, как может показаться: социально-экономическое развитие говорит о возможностях экономической целесообразности принимаемых решений. Картельные сговоры не допускают ситуации, при которой элементы политического процесса функционально разнесены на независимые элементы. Равным образом, высокое качество позиционных исследований обеспечивает широкие возможности для системы массового участия Равным образом, высокое качество позиционных исследований.",
      time: "10:43",
      isOwn: false,
      isRead: false,
    },
  ]);

  const [selectedContact] = useState<Contact | null>(contacts[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Логика отправки сообщения
      setNewMessage("");
    }
  };

  return (
    <div className="messenger">
      {/* Левая панель с контактами */}
      <div className="messenger__sidebar">
        <div className="messenger__header">
          <div className="messenger__search">
            <div className="messenger__search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск"
              className="messenger__search-input"
            />
          </div>
          <button className="messenger__filter-btn">⚙️</button>
        </div>

        <div className="messenger__contacts">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`messenger__contact ${selectedContact?.id === contact.id ? "messenger__contact--active" : ""}`}
            >
              <div className="messenger__contact-avatar">
                {contact.avatar}
                {contact.isOnline && (
                  <div className="messenger__online-indicator"></div>
                )}
              </div>
              <div className="messenger__contact-info">
                <div className="messenger__contact-header">
                  <span className="messenger__contact-name">
                    {contact.name}
                  </span>
                  <span className="messenger__contact-time">
                    {contact.time}
                  </span>
                </div>
                <div className="messenger__contact-message">
                  {contact.isRead && (
                    <span className="messenger__read-icon">✓</span>
                  )}
                  <span className="messenger__message-text">
                    {contact.lastMessage}
                  </span>
                </div>
              </div>
              {contact.hasUnread && (
                <div className="messenger__unread-indicator"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Правая панель с чатом */}
      <div className="messenger__chat">
        {selectedContact ? (
          <>
            <div className="messenger__chat-header">
              <div className="messenger__chat-user">
                <div className="messenger__chat-avatar">
                  {selectedContact.avatar}
                  {selectedContact.isOnline && (
                    <div className="messenger__online-indicator"></div>
                  )}
                </div>
                <span className="messenger__chat-name">
                  {selectedContact.name}
                </span>
              </div>
              <span className="messenger__chat-time">29 июля</span>
            </div>

            <div className="messenger__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`messenger__message ${message.isOwn ? "messenger__message--own" : ""}`}
                >
                  <div className="messenger__message-content">
                    {message.text}
                  </div>
                  <div className="messenger__message-footer">
                    <span className="messenger__message-time">
                      {message.time}
                    </span>
                    {message.isOwn && message.isRead && (
                      <span className="messenger__message-read">✓</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="messenger__date-separator">
                <span>Сегодня</span>
              </div>
            </div>

            <div className="messenger__input">
              <button className="messenger__attachment-btn">📎</button>
              <input
                type="text"
                placeholder="Начните общение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="messenger__input-field"
              />
              <button
                className="messenger__send-btn"
                onClick={handleSendMessage}
              >
                ➤
              </button>
            </div>
          </>
        ) : (
          <div className="messenger__no-chat">
            <p>Выберите контакт для начала общения</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerList;
