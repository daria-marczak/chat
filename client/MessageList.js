import React from "react";
import styles from "./MessageList.css";

const Message = (props) => (
  <div className={styles.Message}>
    <strong>{props.from} wrote</strong>
    <div className={styles.MessageText}>{props.text}</div>
  </div>
);

const MessageList = (props) => (
  <div className={styles.MessageList}>
    {
      props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            from={message.from}
            text={message.text}
          />
        )
      })
    }
  </div>
);

export default MessageList;