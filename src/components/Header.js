import React from 'react';
import { Menu, MenuItem } from 'semantic-ui-react';

const Header = () => {
    return (
        <Menu style={{ marginTop : '10px' }}>
            <MenuItem>Quorum</MenuItem>
            <Menu.Menu position='right'>
                <MenuItem>Campaigns</MenuItem>
                <MenuItem>+</MenuItem>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
