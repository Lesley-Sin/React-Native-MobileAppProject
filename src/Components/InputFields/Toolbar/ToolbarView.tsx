import React, { FC } from 'react';
import { DefaultButton } from '../../Buttons/Button';
import { ToolbarProps } from './Interfaces/ToolbarProps';

import type { ToolbarItemView } from './Interfaces/ToolbarItemView';
import { View } from 'react-native';
import { UPDATE_TOOLBAR_EVENT } from '../../Interfaces/Constants';
import { margins } from '../../../globalStyles/constants';

export const ToolbarView: FC<ToolbarProps> = ({ emitter, toolbarItem, id, ucmdService, contextSender }) => {
    const [items, setToolbarItems] = React.useState<ToolbarItemView[]>([]);
    const [singleItem, setSingleItem] = React.useState<ToolbarItemView | undefined>();

    React.useEffect(() => {
        const updates = (updates: ToolbarItemView[]) => {
            if (toolbarItem) {
                const update = updates.find((v) => {
                    return v.id == toolbarItem.id;
                });
                setSingleItem(update);
            } else {
                setToolbarItems(updates);
            }
        };
        emitter.addListener(UPDATE_TOOLBAR_EVENT + id, updates);
        emitter.addListener(`${UPDATE_TOOLBAR_EVENT}0`, updates);
        return () => {
            emitter.removeListener(UPDATE_TOOLBAR_EVENT + id, updates);
            emitter.removeListener(`${UPDATE_TOOLBAR_EVENT}0`, updates);
        };
    }, []);

    const toolbarView = React.useMemo(() => {
        if (Array.isArray(items) && toolbarItem === undefined) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    {items.map((item, i) => {
                        let marginLeft = 0;
                        if (i > 0) {
                            marginLeft = margins.smallMargin;
                        }
                        return (
                            <View style={{ marginLeft: marginLeft }} key={i} >
                                <DefaultButton
                                    key={item.id}
                                    onPress={async () => {
                                        await ucmdService.handleUserCommandAction(item, contextSender);
                                    }}
                                >
                                    {item?.name}
                                </DefaultButton>
                            </View>
                        );
                    })}
                </View>
            );
        } else {
            return (
                <DefaultButton
                    onPress={async () => {
                        await ucmdService.handleUserCommandAction(singleItem! as ToolbarItemView, contextSender);
                    }}
                >
                    {toolbarItem?.name ?? singleItem?.name}
                </DefaultButton>
            );
        }
    }, [items, singleItem]);

    return toolbarView;
};
