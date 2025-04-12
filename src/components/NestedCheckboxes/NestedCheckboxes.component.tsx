import {
    ChangeEventHandler,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react';

import { CheckboxInput } from './CheckboxInput.component';
import { CheckboxItem } from './NestedCheckboxes.constants';
import { updateChildren, updateListCheckedValue } from './NestedCheckboxes.utils';

import './NestedCheckboxes.styles.css';

const CheckboxListContext = createContext<{
    list: CheckboxItem[];
    setList: Dispatch<SetStateAction<CheckboxItem[]>>;
} | null>(null);

type CheckboxesProps = Readonly<{
    items: CheckboxItem[];
}>;

export function Checkboxes({ items }: CheckboxesProps) {
    const [list, setList] = useState(items);

    return (
        <CheckboxListContext.Provider value={{ list, setList }}>
            <div className="checkbox-tree">
                {list.map((item) => (
                    <CheckboxesGroup key={item.id} item={item} />
                ))}
            </div>
        </CheckboxListContext.Provider>
    );
}

type CheckboxesGroupProps = {
    item: CheckboxItem;
};

export function CheckboxesGroup({ item }: CheckboxesGroupProps) {
    const { list, setList } = useContext(CheckboxListContext)!;

    const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { checked } = event.target as HTMLInputElement;

        updateChildren(item, checked);
        list.forEach(updateListCheckedValue);
        setList(structuredClone(list));
    };

    return (
        <div className="checkbox-group">
            <CheckboxInput checked={item.checked} label={item.name} onChange={onCheckboxChange} />
            {item.children?.map((child) => <CheckboxesGroup key={child.id} item={child} />)}
        </div>
    );
}

export default Checkboxes;
