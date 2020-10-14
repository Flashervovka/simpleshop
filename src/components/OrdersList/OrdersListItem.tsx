import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {IBasketProduct} from "../../store/basket/types";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {STATUS_ADMIN_VIEW} from "../../config";
import {removeProductFromLocalStorage} from "../../helpers/localStorageHelper";

interface OrdersListItemProps {
    orderList:IBasketProduct[]
    onChangeOrderStatus?(basketProduct:IBasketProduct):void
    viewStatus?:string
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            borderBottomLeftRadius:4,
            borderBottomRightRadius:4
        },
    }),
);


const OrdersListItem: React.FC<OrdersListItemProps> = (props: OrdersListItemProps) => {
    const {orderList, onChangeOrderStatus, viewStatus} = props;

    const classes = useStyles();

    const onChangeStatus = (basketProduct:IBasketProduct) => () => {
        if(onChangeOrderStatus){
            onChangeOrderStatus(basketProduct);
            removeProductFromLocalStorage(basketProduct.id);
        }
    }

    return (
        <List className={classes.root}>
            {orderList.map((basketProduct, index) => {
                return (
                    <ListItem key={index} button>
                        <ListItemAvatar>
                            <Avatar
                                alt={basketProduct.product.name}
                                src={`../images/${basketProduct.product.url}`}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={`${basketProduct.product.name} (${basketProduct.count}) Цена: ${basketProduct.count*parseFloat(basketProduct.product.price)} руб.`} />
                        <ListItemSecondaryAction>
                            {
                                viewStatus !== STATUS_ADMIN_VIEW ?
                                    <IconButton edge="end" aria-label="delete" onClick={onChangeStatus(basketProduct)}>
                                        <DeleteIcon/>
                                    </IconButton> :
                                    null
                            }

                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default OrdersListItem;
