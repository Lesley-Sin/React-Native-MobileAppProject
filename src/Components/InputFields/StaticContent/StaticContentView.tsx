import React from 'react';
import { Text, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

interface IStaticContentViewProps {
    content: string;
    id: string;
};

export const StaticContentView: React.FC<IStaticContentViewProps> = ({ content, id }) => {
    const { width } = useWindowDimensions();
    return (
        <Text>
            <RenderHtml
                contentWidth={width}
                source={{ html: content }}
            />
        </Text>
    )
};
