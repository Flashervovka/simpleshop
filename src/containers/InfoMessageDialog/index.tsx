import React from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {InfoMessagesActionTypes} from "../../store/infoMessages/types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getMessageInfoMessageSelector, getShowInfoMessageSelector} from "../../store/infoMessages/reducer";
import {hideInfoMessageAction} from "../../store/infoMessages/actions";

const mapStateToProps = (state: RootStateType) => ({
    isOpen:getShowInfoMessageSelector(state),
    message:getMessageInfoMessageSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, InfoMessagesActionTypes>) => {
    return{
        onCloseInfoMessage: ():void => {
            dispatch(hideInfoMessageAction());
        }
    }
}

type InfoMessagesDialogProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const InfoMessagesDialog: React.FC<InfoMessagesDialogProps> = (props: InfoMessagesDialogProps) => {
    const {isOpen, onCloseInfoMessage, message} = props;
    return (
        <div className="page-content-wrapper">
            <Dialog
                open={isOpen}
                onClose={onCloseInfoMessage}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Сообщение</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            message
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseInfoMessage} color="primary">
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(InfoMessagesDialog);
