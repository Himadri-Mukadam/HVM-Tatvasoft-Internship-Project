import { createTheme, colors } from "@mui/material";

export const theme = createTheme({
    palette: {
        text: {
            black: "#000000",
            white: "#ffffff"
        },
        primary: {
            light: "rgb(250, 128, 133)",
            main: "rgb(249, 97, 103)",
            dark: "rgb(174, 67, 72)"
        },
        secondary: {
            light: "rgb(83, 228, 99)",
            main: "rgb(40, 222, 61)",
            dark: "rgb(28, 155, 42)"
        },
        error: {
            main: "rgb(237, 17, 9)"
        }
    },

});