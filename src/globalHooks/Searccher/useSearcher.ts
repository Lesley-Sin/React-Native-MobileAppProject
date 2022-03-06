import { useEffect, useRef, useState } from 'react';

export const useSearcher = () => {
    const [value, setValue] = useState<string>('');

    const setField = (value: string) => {
        setValue(value);
    };
    const clearField = () => {
        setValue('');
    };

    return { setField, clearField, value };
};
