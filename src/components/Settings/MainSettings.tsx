import React,{useState, Fragment, useEffect} from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import './styles.css';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {ISettings} from "../../store/settings/types";
import Button from "@material-ui/core/Button";
import AccordionActions from '@material-ui/core/AccordionActions';
import ButtonGroup from "@material-ui/core/ButtonGroup";
interface MainSettingsProps {
    settings:ISettings
    onSetSettings(settings:ISettings):void
}

const inputProps: Object = {
    style: {color: "rgba(0, 0, 0, 0.87)"}
}
const MainSettings: React.FC<MainSettingsProps> = (props: MainSettingsProps) => {
    const {settings, onSetSettings} = props;
    const [minOrderCost, setMinOrderCost] = useState<string>('');
    useEffect(() => {
        setMinOrderCost(settings.minOrderCost)
    },[settings.minOrderCost])


    const onSaveSettings = ():void => {
        onSetSettings({
            minOrderCost,
            id:settings.id
        })
    }

    const onChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        switch (event.target.name){
            case 'minOrderCost':
                /*TODO check value less zero equal*/
                setMinOrderCost(event.target.value as string);
                break;
            default:
                break;
        }
    }

    return (
        <Fragment>
            <AccordionDetails>
                <div className="main-settings__wrapper">
                    <div className="main-settings__settings-item">
                        <Typography variant="body2" color="textPrimary" component="p">
                            Миниммальная цена заказа
                        </Typography>
                        <TextField
                            type="number"
                            InputProps={{
                                inputProps: {
                                    ...inputProps,
                                    min: 0
                                }
                            }}
                            fullWidth
                            value={minOrderCost}
                            onChange={onChange}
                            name="minOrderCost"/>
                    </div>
                </div>
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
