export const themes = {
    light: {
        colorPrimary: '#2291ec',
        fontSize: 16,
        borderRadius: 5,
    },
    lightComponents: {
        Button: {
            colorPrimary: '#00b96b',
            algorithm: true, // Enable algorithm
        },
        Menu: {
            itemBg: "#075985",
            colorText: "#ffffff",
        },
        Layout: {
            headerBg: "#075985",
            bodyBg: "#0284c7",
            footerBg: "#075985"
        },
    },
    dark: {
        colorPrimary: '#313c4b',
        borderRadius: 5,
        colorText: "#FFFFFF",
        fontSize: 16,
        colorBgContainer: '#1f2937',
    },
    DarkComponents: {
        Layout: {
            headerBg: "#051025",
            bodyBg: "#111827",
            footerBg: "#051025"
        },
        Menu: {
            itemBg: "#051025",
        },
        Button: {
            defaultBg: "#313c4b",
        },
        Input: {
            colorTextPlaceholder: "#FFFFFF"
        },
        Modal: {
            contentBg: '#1f2937',
            headerBg: '#1f2937'
        }
    },
}