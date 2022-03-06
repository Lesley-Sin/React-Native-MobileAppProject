import React, { useCallback, useState } from 'react';
import { Fragment } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

interface ElementSizes {
    height: number;
    width: number;
}

export const useComponentSize = (): [ElementSizes, (event: LayoutChangeEvent) => void] => {
    const [size, setSize] = useState<ElementSizes>({ height: 0, width: 0 });
    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    }, []);

    return [size, onLayout];
};
