import { createContext } from 'react';

export type TabsContextType = {
    tabsId: string;
    value: string;
    onChange: (value: string) => void;
};

export const TabsContext = createContext<TabsContextType>({
    tabsId: '',
    value: '',
    onChange: () => {},
});
