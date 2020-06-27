import React, {useEffect, useState} from 'react';
import MessageItem from "../../components/MessageItem";
import { connect } from 'react-redux'
import {addMessageAction, editMessageAction, LoadMessagesAction, loadMessagesAction} from '../../store/messages/actions'
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {IMessage} from "../../store/messages/types";

const mapStateToProps = (state: RootStateType) => ({
    messages: state.chatState.messages
})
const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, LoadMessagesAction>) => {
    return {
        onLoadMessages: ():void => {
            dispatch(loadMessagesAction())
        },

        onEditMessage: (message:IMessage):void => {
            dispatch(editMessageAction(message))
        }
    }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps>&ReturnType<typeof mapStateToProps>;

const MessagesList:React.FC<ReduxType> = (props: ReduxType) => {
    const [message, setMessage] = useState<IMessage>({name:""});
    const {onLoadMessages, onEditMessage} = props;
    useEffect( () => {
        onLoadMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onAdd = (event: React.MouseEvent): void => {
     //   onAddMessage(message.name);
    }

    const onEdit = (event: React.MouseEvent): void => {
        onEditMessage(message);
    }

    const onInputMessage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage({name:event.target.value, id: message.id});
    }



    return (
        <div>
            {
                props.messages.map((message) => <MessageItem messageData={message} setEditMessage={setMessage} key={message.id}/>)
            }
            <div>
                <input placeholder="введите сообщение" onChange={onInputMessage} value={message.name}/>
                <button onClick={onAdd}>Добавить сообщение</button>
                <button onClick={onEdit}>Редактировать сообщение</button>
            </div>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatcherToProps)(MessagesList);