import React from 'react'
import Layout1 from './Layout/Layout1'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserManagement from '../pages/UserManagement';
import ContactUsView from '../pages/ContactUsView';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AdminManagement() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Layout1>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '95%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                                <Tab textColor="#2A4B0D" indicatorColor='#2A4B0D' label="User Management" {...a11yProps(0)} />
                                <Tab label="Contact us view" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <UserManagement />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <ContactUsView />
                        </CustomTabPanel>
                    </Box>
                </div>
            </Layout1>
        </>

    )
}

export default AdminManagement