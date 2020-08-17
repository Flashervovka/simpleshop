import React from "react";
import {Alert, AlertTitle} from '@material-ui/lab';
import './style.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from "@material-ui/core/IconButton";

interface AlertMessageProps {
    title?: string
    message?: string
    isShow?: boolean | null
    type?: "error" | "warning" | "info" | "success"
    onCloseAlert():void
}

const AlertMessage: React.FC<AlertMessageProps> = (props: AlertMessageProps) => {
    const {title, isShow, message, type, onCloseAlert} = props;

    return (
        isShow ?
            <div className="alert-message">
                <Alert severity={type}>
                    <AlertTitle>{title}</AlertTitle>
                    {message}
                    <IconButton
                        edge="end"
                        aria-label="close"
                        className="alert-message__close-btn"
                        onClick={onCloseAlert}>
                        <HighlightOffIcon/>
                    </IconButton>
                </Alert>
            </div> : null

    );
}

export default AlertMessage;