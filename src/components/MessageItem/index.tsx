import React from 'react';
import {IMessage} from "../../store/messages/types";

type MessageProps = {
    messageData:IMessage,
    setEditMessage: Function
}

const MessageItem = (props: MessageProps) => {
    const {messageData, setEditMessage} = props;
    const onEdit = (event: React.MouseEvent): void => {
        setEditMessage(messageData);
    }

    return(
        <div onClick={onEdit}>
            {messageData.name}
        </div>
    )
}

export default MessageItem;