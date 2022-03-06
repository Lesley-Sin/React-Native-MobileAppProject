export interface IContextMenu {
    contextMenuPosition?: IContextMenuPosition;
    setContextMenuWidth?: React.Dispatch<React.SetStateAction<number>>;
    closeContextMenu: (() => any) | undefined;
    isOpen: boolean;
}

export interface IContextMenuPosition {
    x: number;
    y: number;
}
