import React, {useEffect, useState} from "react";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {ProductsActionTypes} from "../../store/products/types";
import {connect} from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
/*import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';*/
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {userLoginAction} from "../../store/user/actions";

/*function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}*/

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
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, ProductsActionTypes>) => {
    return{
        onLogin: (login:string, passsword:string) => {
            dispatch(userLoginAction(login, passsword));
        }

    }
}

type AdminLoginType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminLogin: React.FC<AdminLoginType> = (props: AdminLoginType) => {

    const {onLogin} = props;
    const [login, setLogin] = useState<string>('admin');
    const [password, setPassword] = useState<string>('admin');

    const onChange = (fieldName:string) => (event: React.ChangeEvent<{value: string}>) => {
        switch (fieldName){
            case "login":
                setLogin(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    }

    const classes = useStyles();

    const onUserLogin = ():void => {
        onLogin(login,password);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    </form>
                </div>

            </div>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(AdminLogin);
