import {
    ComponentPropsWithRef,
    PropsWithChildren,
    ReactNode,
    useContext,
    useId,
    useRef,
} from 'react';
import clsx from 'clsx';

import { TabsContext } from './Tabs.context';
import { getTabListItemId, getTabPanelId } from './Tabs.utils';
import { useTabsNavigation } from './useTabsNavigation.hook';

import './Tabs.styles.css';

export type TabProps = {
    value: string;
    children: ReactNode;
};

export type TabsProps = {
    children: ReactNode;
    value: string;
    onChange: (value: string) => void;
};

export default function Tabs({ children, value, onChange }: TabsProps) {
    const tabsId = useId();

    return (
        <TabsContext.Provider value={{ tabsId, value, onChange }}>{children}</TabsContext.Provider>
    );
}

type ListProps = {
    children: React.ReactElement<TabProps>[];
};

export function List({ children }: ListProps) {
    const { tabsId, value, onChange } = useContext(TabsContext);
    const tabListRef = useRef<HTMLDivElement>(null);

    useTabsNavigation(tabListRef, children, value, onChange);

    return (
        <div className="tab-list" role="tablist" ref={tabListRef}>
            {children.map((tab) => {
                const { value: tabValue } = tab.props;
                const isActive = tabValue === value;

                return (
                    <TabButton
                        role="tab"
                        id={getTabListItemId(tabsId, tabValue)}
                        className={clsx(['tab-list__item', isActive && 'tab-list__item--active'])}
                        key={tabValue}
                        onClick={() => onChange(tabValue)}
                        aria-controls={getTabPanelId(tabsId, tabValue)}
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                    >
                        {tab}
                    </TabButton>
                );
            })}
        </div>
    );
}

function Tab({ children }: TabProps) {
    return children;
}

type TabButtonProps = PropsWithChildren<ComponentPropsWithRef<'button'>>;

function TabButton({ children, ...props }: TabButtonProps) {
    return <button {...props}>{children}</button>;
}

type ContentProps = {
    children: React.ReactElement<TabProps>[];
};

function Content({ children }: ContentProps) {
    const { tabsId, value } = useContext(TabsContext);
    const panel = children.find((panel) => panel.props.value === value);

    if (!panel) return null;

    return (
        <div
            id={getTabPanelId(tabsId, panel.props.value)}
            role="tabpanel"
            aria-labelledby={getTabListItemId(tabsId, panel.props.value)}
        >
            {panel}
        </div>
    );
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Tab;
Tabs.TabButton = TabButton;
Tabs.Content = Content;
