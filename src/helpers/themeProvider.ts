export const themes = {
    light: {
        colorPrimary: '#2291ec',
        fontSize: 16,
        borderRadius: 5,
        colorBgContainer: '#075985',
        colorBgElevated: '#075985',
        colorText: 'white',
        colorBgMask: 'rgba(0,0,0,0.37)'
    },
    lightComponents: {

        Button: {
            colorPrimary: '#00b96b',
            algorithm: true, // Enable algorithm
        },
        Menu: {
            itemBg: "#075985",
            colorText: "#ffffff",
            itemHeight: 60,
            subMenuItemBg: 'rgba(0,0,0,0.37)'
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
        colorBgElevated:  '#051025',
        colorBgMask: 'rgba(0,0,0,0.37)'
    },
    DarkComponents: {
        Layout: {
            headerBg: "#051025",
            bodyBg: "#111827",
            footerBg: "#051025"
        },
        Menu: {
            itemBg: "#051025",
            itemHeight: 60,
            subMenuItemBg: 'rgba(0,0,0,0.37)'
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