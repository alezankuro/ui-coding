import { TabProps } from './Tabs.component';

export function getNextTabIndex(
    tabs: React.ReactElement<TabProps>[],
    currentValue: string,
): number {
    const currentTabIndex = tabs.findIndex((tab) => tab.props.value === currentValue);
    return (currentTabIndex + 1) % tabs.length;
}

export function getPrevTabIndex(
    tabs: React.ReactElement<TabProps>[],
    currentValue: string,
): number {
    const currentTabIndex = tabs.findIndex((tab) => tab.props.value === currentValue);
    return currentTabIndex ? currentTabIndex - 1 : tabs.length - 1;
}

export function getTabListItemId(tabsId: string, value: string): string {
    return `${tabsId}-tab-${value}`;
}

export function getTabPanelId(tabsId: string, value: string): string {
    return `${tabsId}-tabpanel-${value}`;
}

export function selectTabByIndex(
    tabs: React.ReactElement<TabProps>[],
    index: number,
    tabsId: string,
    onChange: (value: string) => void,
): void {
    const tab = tabs[index];
    if (!tab) return;

    onChange(tab.props.value);
    document.getElementById(getTabListItemId(tabsId, tab.props.value))?.focus();
}
