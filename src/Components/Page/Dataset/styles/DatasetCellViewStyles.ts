import styled from 'styled-components/native';
import { padding } from 'styled-system';
import { colorScheme, paddings, sizesScheme } from '../../../../globalStyles/constants';
import { ICell } from './interfaces/IDatasetCellViewStyles';

export const Cell = styled.View<ICell>`
    background-color: ${colorScheme.defaultColors.mainColor};
    height: ${sizesScheme.table.height}px;
    padding-horizontal: ${paddings.defaultPaddings}px;
    border-color: ${colorScheme.formColors.mainColor};
    display: flex;
    border-left-width: ${({ borderLeft }) => (borderLeft ? borderLeft : 0)}px;
    border-bottom-width: 1px;
    border-right-width: ${({ borderRight }) => (borderRight ? borderRight : 0)}px;
    justify-content: center;
`;

export const HeaderCell = styled(Cell)`
    background-color: ${colorScheme.defaultColors.defaultBackgroundColor};
    border-color: ${colorScheme.defaultColors.mainColor};
`;
