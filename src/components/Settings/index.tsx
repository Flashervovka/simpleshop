import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css';
import CategorySettings from "./CategorySettings";
import {ICategory} from "../../store/categories/types";
import MainSettings from "./MainSettings";
import {ISettings} from "../../store/settings/types";

interface AdminSettingsProps {
    categories:ICategory[]
    onAddNewCategory(category:ICategory):void
    onRemoveCategory(category:ICategory):void
    onSetSettings(settings:ISettings):void
    settings:ISettings
}

const AdminSettings: React.FC<AdminSettingsProps> = (props: AdminSettingsProps) => {
    const {categories, onAddNewCategory, onRemoveCategory, settings, onSetSettings} = props;

    return (
        <div className="settings-wrapper">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                >
                    <Typography>Категории</Typography>
                </AccordionSummary>
                <CategorySettings categories={categories} onAddNewCategory={onAddNewCategory} onRemoveCategory={onRemoveCategory}/>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                >
                    <Typography>Настройки</Typography>
                </AccordionSummary>
                <MainSettings settings={settings} onSetSettings={onSetSettings}/>
            </Accordion>

            {/*<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                >
                    <Typography>Пользователи</Typography>
                </AccordionSummary>
                <div>Здесь будут создаваться, удаляться пользователи</div>
            </Accordion>*/}
        </div>
    );
}

export default AdminSettings;
