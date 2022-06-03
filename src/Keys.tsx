import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [Data, setData] = useState<Array<IItem>>([]);
    useEffect(() => {
        if (props.sorting === 'ASC')
            setData([...props.initialData].sort((a, b) => a.id - b.id));
        if (props.sorting === 'DESC')
            setData([...props.initialData].sort((a, b) => b.id - a.id));
    }, [props.initialData, props.sorting]);
    return (
        <>
            {Data.map((item) => {
                return <Elem key={item.id} item={item} />;
            })}
        </>
    );
}
function Elem(props: { item: IItem }) {
    const [value, setValue] = useState(props.item.name);
    const [isEdit, setIsEdit] = useState(false);
    const [value2, setValue2] = useState(value);

    let elem;

    if (!isEdit) {
        elem = (
            <div key={props.item.id} onClick={() => setIsEdit(true)}>
                {value}
            </div>
        );
    } else {
        elem = (
            <input
                value={value2}
                key={props.item.id}
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        setValue(value2);
                        setIsEdit(false);
                    } else if (e.keyCode == 27) {
                        setValue2(value);
                        setIsEdit(false);
                    }
                }}
                onChange={(event) => setValue2(event.target.value)}
            />
        );
    }

    return elem;
}
