import React,{useState, Fragment, useEffect, useCallback} from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import './styles.css';
import {ISettings} from "../../store/settings/types";
import Button from "@material-ui/core/Button";
import AccordionActions from '@material-ui/core/AccordionActions';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MainSettingsItem from "./MainSettingsItem";
interface MainSettingsProps {
    settings:ISettings
    onSetSettings(settings:ISettings):void
}

const MainSettings: React.FC<MainSettingsProps> = (props: MainSettingsProps) => {
    const {settings, onSetSettings} = props;
    const [minOrderCost, setMinOrderCost] = useState<string>('');
    const [orderSuccessMessage, setOrderSuccessMessage] = useState<string>('');
    const [hasNewOrderNotification, setHasNewOrderNotification] = useState<boolean>(false);
    useEffect(() => {
        setMinOrderCost(settings.minOrderCost)
        setOrderSuccessMessage(settings.orderSuccessMessage)
        setHasNewOrderNotification(settings.hasNewOrderNotification)
    },[settings])

    const onSaveSettings = useCallback(
        ():void => {
            onSetSettings({
                minOrderCost,
                id:settings.id,
                orderSuccessMessage,
                hasNewOrderNotification
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [settings, minOrderCost, orderSuccessMessage, hasNewOrderNotification]
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name){
            case 'minOrderCost':
                /*TODO check value less zero equal*/
                setMinOrderCost(event.target.value as string);
                break;
            case 'orderSuccessMessage':
                setOrderSuccessMessage(event.target.value as string);
                break;
            case 'hasNewOrderNotification':console.log("event.target.checked",event.target.checked);
                setHasNewOrderNotification(event.target.checked);
                break;
            default:
                break;
        }
    }

    return (
        <Fragment>
            <AccordionDetails>
                <MainSettingsItem
                    label="Миниммальная цена заказа"
                    setting={minOrderCost}
                    settingName="minOrderCost"
                    onChange={onChange}
                    type="number"/>
                <MainSettingsItem
                    multiline={true}
                    label="Текст сообщения при отправке закза"
                    setting={orderSuccessMessage}
                    settingName="orderSuccessMessage"
                    onChange={onChange}/>
                <MainSettingsItem
                    type="checkbox"
                    label="Звуковой сигнал если есть непринятый заказ"
                    settingChecked={hasNewOrderNotification}
                    settingName="hasNewOrderNotification"
                    onChange={onChange}/>
            </AccordionDetails>
            <AccordionActions>
                <ButtonGroup className="order-buttons-group" variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button onClick={onSaveSettings}>
                        Сохранить настройки
                    </Button>
                </ButtonGroup>
            </AccordionActions>
        </Fragment>

    );
}

export default MainSettings;
