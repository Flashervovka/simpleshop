import React, {useState, Fragment} from "react";
import {IAdminProductsPageProps} from "./types";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {ProductsActionTypes} from "../../store/products/types";

import {connect} from "react-redux";
import {getBasketOrdersListSelector} from "../../store/basket/reducer";
import OrdersList from "../../components/OrdersList";
import {FormControl} from "@material-ui/core";
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import './styles.css';
import {IBasketProduct} from "../../store/basket/types";
import {removeProductFrombasketAction} from "../../store/basket/actions";
import {makeOrderAction} from "../../store/orders/actions";

const mapStateToProps = (state: RootStateType) => ({
    basketOrdersList: getBasketOrdersListSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, ProductsActionTypes>) => {
    return {
        onChangeOrderStatus: (basketProduct:IBasketProduct):void => {
            dispatch(removeProductFrombasketAction(basketProduct))
        },
        onMakeOrder: (order:IBasketProduct[], adress:string, phone:string):void => {
            dispatch(makeOrderAction(order, adress, phone))
        }
    }
}

type TypeShoppingPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const inputProps: Object = {
    style: {color: "rgba(0, 0, 0, 0.87)"},
}

const ShoppingPage: React.FC<TypeShoppingPageProps & IAdminProductsPageProps> = (props: TypeShoppingPageProps) => {
    const {basketOrdersList, onChangeOrderStatus, onMakeOrder} = props;

    const [phone, setPhone] = useState<string>('');
    const [adress, setAdress] = useState<string>('');
    const [sendPressed, setSendPressed] = useState<boolean>(false);

    const onSetPhone = (phoneNumber: string) => {
        setPhone(phoneNumber);
        setSendPressed(false);
    }

    const onSetAdress = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        setAdress(event.target.value as string);
        setSendPressed(false);
    }

    const onSendOrder = () => {
        setSendPressed(true);
        if(adress !== "" && phone.length === 18){
            onMakeOrder(basketOrdersList, adress, phone)
        }
    }

    return (
        <div className="page-content-wrapper">
            {
                basketOrdersList.length > 0 ?
                    <Fragment>
                        <OrdersList
                            ordersList={[basketOrdersList]}
                            onChangeOrderStatus={onChangeOrderStatus}/>
                        <div className="shopping-page__user-phone">
                            <FormControl fullWidth error={phone.length < 18 && sendPressed}>
                                <InputLabel required className="shopping-page__user-phone-label">Телефон</InputLabel>
                                <MaterialUiPhoneNumber
                                    error={phone.length < 18 && sendPressed}
                                    value={phone}
                                    defaultCountry="ru"
                                    onlyCountries={['ru']}
                                    onChange={onSetPhone}
                                />
                                {phone.length < 18 && sendPressed &&
                                <FormHelperText>Поле является обязательным</FormHelperText>}
                            </FormControl>
                        </div>
                        <FormControl fullWidth error={adress === "" && sendPressed}>
                            <TextField
                                error={adress === "" && sendPressed}
                                InputProps={inputProps}
                                label="Адрес доставки"
                                fullWidth
                                required
                                value={adress}
                                onChange={onSetAdress}
                                name="adress"
                                multiline/>
                            {adress === "" && sendPressed &&
                            <FormHelperText>Поле является обязательным</FormHelperText>}
                        </FormControl>
                        <Button
                            //disabled={adress === "" || phone.length < 18}
                            onClick={onSendOrder}
                            color="primary"
                            variant="contained"
                            className="shopping-page__orders-send-btn"
                        >
                            Отправить заказ
                        </Button>
                    </Fragment> :
                    <div className="shopping-page__empty-message">
                        Нет заказов
                    </div>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(ShoppingPage);
