import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {IBasketProduct} from "../../store/basket/types";
import OrdersListItem from "./OrdersListItem";


interface OrdersListProps {
    ordersList:IBasketProduct[][]
    onChangeOrderStatus(basketProduct:IBasketProduct):void
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius:4
        },
    }),
);


const OrdersList: React.FC<OrdersListProps> = (props: OrdersListProps) => {
    const {ordersList, onChangeOrderStatus} = props;

    const classes = useStyles();
    
    return (
        <List className={classes.root}>
            {ordersList.map((basketProductsList, index) => {
                return (
                    <ListItem key={index} button>
                        <OrdersListItem
                            orderList={basketProductsList}
                            onChangeOrderStatus={onChangeOrderStatus}/>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default OrdersList;
