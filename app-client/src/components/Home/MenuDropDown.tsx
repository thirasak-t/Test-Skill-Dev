import { Menu, MenuItem, MenuProps } from "@mui/material";
import { ReactNode } from "react";

export interface menuOption {
    icon?: ReactNode;
    onClick: () => void;
    label: string;
}

interface MenuDropDownProps {
    handleClose: () => void;
    options: menuOption[];
}

function MenuDropDown({ anchorEl, handleClose, open, sx, options }: MenuDropDownProps & MenuProps) {
    return (
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            sx={sx}
        >
            {options.map((_option) => (
                <MenuItem
                    key={_option.label}
                    style={{
                        display: "flex",
                        gap: 15,
                        alignItems: "center",
                    }}
                    onClick={() => {
                        _option.onClick();
                        handleClose();
                    }}
                >
                    {_option.icon}
                    {_option.label}
                </MenuItem>
            ))}
        </Menu>
    );
}

export default MenuDropDown;
