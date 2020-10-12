import React, {useEffect, useState} from "react";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {ProductsActionTypes} from "../../store/products/types";
import {connect} from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {userLoginAction} from "../../store/user/actions";
import {getUserSelector} from "../../store/user/reducer";
import { history } from '../../store/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex'
    },
    paperContent: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const mapStateToProps = (state: RootStateType) => ({
    user:getUserSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, ProductsActionTypes>) => {
    return{
        onLogin: (login:string, passsword:string, beInSystem:boolean) => {
            dispatch(userLoginAction(login, passsword, beInSystem));
        }
    }
}

type AdminLoginType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminLogin: React.FC<AdminLoginType> = (props: AdminLoginType) => {

    const {onLogin, user} = props;
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [beInSystem, setBeInSystem] = useState<boolean>(localStorage.getItem("beInSystem") === "1");
    const onChange = (fieldName:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (fieldName){
            case "login":
                setLogin(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "beInSystem":
                setBeInSystem(event.target.checked)
                localStorage.setItem("beInSystem", event.target.checked ? "1" : "0");
                break;
        }
    }

    const classes = useStyles();

    const onUserLogin = ():void => {
        onLogin(login,password, beInSystem);
    }

    useEffect(() => {
        if(beInSystem){
            onLogin(login,password, beInSystem);
        }
        if(user?.id){
            history.push(`/dashboard`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.paperContent}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Логин пользователя"
                            name="login"
                            autoFocus
                            value={login}
                            onChange={onChange('login')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль пользователя"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onChange('password')}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onUserLogin}
                        >
                            Вход
                        </Button>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={beInSystem}
                                    onChange={onChange("beInSystem")}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Оставаться в системе"
                        />
                    </form>
                </div>

            </div>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(AdminLogin);
