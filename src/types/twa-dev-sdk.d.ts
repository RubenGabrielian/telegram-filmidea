declare module '@twa-dev/sdk' {
    const WebApp: {
        ready: () => void;
        close: () => void;
        openTelegramLink: (url: string) => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
        colorScheme: 'light' | 'dark';
        initDataUnsafe: {
            start_param?: string;
            user?: {
                id: number;
                first_name: string;
                last_name: string;
                username?: string;
            };
        };
    };
    export default WebApp;
} 