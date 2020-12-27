import React from 'react';
import './styles.css';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
interface MainSettingsItemProps {
    type?:"number" | "text" | "checkbox"
    setting?:string
    settingChecked?:boolean
    multiline?:boolean
    label:string
    settingName:string
    onChange(setting: React.ChangeEvent<{ name?: string | undefined; value: unknown }>):void
}
const inputProps: Object = {
    style: {color: "rgba(0, 0, 0, 0.87)"}
}
const MainSettingsItem: React.FC<MainSettingsItemProps> = (props: MainSettingsItemProps) => {
    const {setting, settingName, onChange, type, label, multiline, settingChecked} = props;
    return (
        <div className="main-settings__wrapper">
            <div className="main-settings__settings-item">
                <Typography variant="body2" color="textPrimary" component="p" className="main-settings__settings-item-header">
                    {label}
                </Typography>
                {
                    type === "checkbox" ?
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={settingChecked}
                                    onChange={onChange}
                                    name={settingName}
                                    color="primary"
                                />
                            }
                            label="Вкл/выкл"
                        /> :
                        <TextField
                            multiline={multiline}
                            type={type}
                            InputProps={{
                                inputProps: {
                                    ...inputProps,
                                    min: 0
                                }
                            }}
                            fullWidth
                            value={setting}
                            onChange={onChange}
                            name={settingName}/>
                }
            </div>
        </div>
    );
}
MainSettingsItem.defaultProps = {
    type:"text",
    multiline: false
}

export default MainSettingsItem;
