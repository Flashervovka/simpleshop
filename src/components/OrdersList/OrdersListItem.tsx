import React, {Fragment} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {IBasketProduct} from "../../store/basket/types";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
//import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {STATUS_ADMIN_VIEW} from "../../config";
import {removeProductFromLocalStorage} from "../../helpers/localStorageHelper";
import {Box} from "@material-ui/core";
//import Divider from '@material-ui/core/Divider';

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
                    <Fragment>
                        <ListItem key={index} alignItems="flex-start" divider>
                            <Box flexDirection="column">
                                <Box display="flex">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={basketProduct.product.name}
                                            src={`../images/${basketProduct.product.url}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${basketProduct.product.name} (${basketProduct.count}) Цена: ${basketProduct.count*parseFloat(basketProduct.product.price)} руб.`} />
                                </Box>
                                <div>
                                    {
                                        viewStatus !== STATUS_ADMIN_VIEW ?
                                            <Box display="flex">
                                                <IconButton edge="end" aria-label="delete" onClick={onChangeStatus(basketProduct)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Box> :
                                            null
                                    }

                                </div>
                            </Box>

                        </ListItem>

                    </Fragment>

                );
            })}
        </List>
    );
}

export default OrdersListItem;
