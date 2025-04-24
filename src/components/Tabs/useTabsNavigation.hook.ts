import { useContext, useEffect } from 'react';

import { TabProps } from './Tabs.component';
import { TabsContext } from './Tabs.context';
import { getNextTabIndex, getPrevTabIndex, selectTabByIndex } from './Tabs.utils';

export function useTabsNavigation(
    tabListRef: React.RefObject<HTMLDivElement | null>,
    tabs: React.ReactElement<TabProps>[],
    value: string,
    onChange: (value: string) => void,
): void {
    const { tabsId } = useContext(TabsContext);

    useEffect(() => {
        const node = tabListRef.current;
        if (!node) return;

        function onKeydown(event: KeyboardEvent): void {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    selectTabByIndex(tabs, getPrevTabIndex(tabs, value), tabsId, onChange);
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    selectTabByIndex(tabs, getNextTabIndex(tabs, value), tabsId, onChange);
                    break;
                case 'Home':
                    event.preventDefault();
                    selectTabByIndex(tabs, 0, tabsId, onChange);
                    break;
                case 'End':
                    event.preventDefault();
                    selectTabByIndex(tabs, tabs.length - 1, tabsId, onChange);
                    break;
            }
        }

        node.addEventListener('keydown', onKeydown);
        return () => node.removeEventListener('keydown', onKeydown);
    }, [tabs, value, onChange, tabsId, tabListRef]);
}
