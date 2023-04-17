const palette = {
    primary: {
        main: "#051867",
        dark: "#031149",
        light: "#3c61f6",
        contrastText: "#ffff",
    },
    secondary: {
        main: "#FFFFFF",
        light: "#e6e6e6",
        dark: "#a4a4a4",
        contrastText: "#000000",
    },
    warning: {
        main: "#ffcc00",
        light: "#ffeb99",
        dark: "#806600",
        contrastText: "#ffff",
    },
    error: {
        main: "#ec3e13",
        light: "#f48b71",
        contrastText: "#8e250b",
    },
};

const Theme = () => {
    const Theme = {
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        "*::-webkit-scrollbar": {
                            width: "8px",
                            height: "8px",
                        },
                    },
                },
            },
        },

        palette,
    };
    return Theme;
};

export default Theme;
