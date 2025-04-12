import { CheckboxItem } from './NestedCheckboxes.constants';

export function updateChildren(node: CheckboxItem, checked: boolean) {
    node.checked = checked;

    if (!node.children) return;

    node.children.forEach((child) => updateChildren(child, checked));
}

export function updateListCheckedValue(node: CheckboxItem) {
    if (!node.children) return;

    node.children.forEach(updateListCheckedValue);

    const selectedChildrenCount = node.children.filter((child) => child.checked === true).length;
    const unselectedChildrenCount = node.children.filter((child) => child.checked === false).length;

    if (selectedChildrenCount === node.children.length) {
        node.checked = true;
    } else if (unselectedChildrenCount === node.children.length) {
        node.checked = false;
    } else {
        node.checked = 'indeterminate';
    }
}
