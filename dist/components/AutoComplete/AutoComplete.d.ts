import React, { ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSoureceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSoureceType[] | Promise<DataSoureceType[]>;
    onSelect?: (item: DataSoureceType) => void;
    renderOption?: (item: DataSoureceType) => ReactElement;
}
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
