import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css';
import CategorySettings from "./CategorySettings";
import {ICategory} from "./types";

interface AdminSettingsProps {
    categories:ICategory[]
}

const AdminSettings: React.FC<AdminSettingsProps> = (props: AdminSettingsProps) => {
    const {categories} = props;
    return (
        <div className="settings-wrapper">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Категории</Typography>
                </AccordionSummary>
                <CategorySettings categories={categories}/>
            </Accordion>
        </div>
    );
}

export default AdminSettings;
