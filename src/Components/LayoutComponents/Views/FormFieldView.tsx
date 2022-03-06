import React, { useEffect } from 'react';
import { FC } from 'react';
import { WithTopBigMg, WithTopSmallMg } from '../../../globalStyles';
import { ComponentType } from '../../Enums/ComponentType';
import { FieldType } from '../../Enums/FieldType';

interface IFormFieldView {
    formChild: JSX.Element;
    fieldType: FieldType | ComponentType | undefined;
    index: number;
}

export const FormFieldView: FC<IFormFieldView> = ({ fieldType, formChild, index }) => {
    const renderFormElement = () => {
        if (index !== 0) {
            switch (fieldType) {
                case FieldType.Boolean:
                case FieldType.Table:
                    return <WithTopBigMg>{formChild}</WithTopBigMg>;
                case FieldType.Text:
                case FieldType.Date:
                case FieldType.Number:
                case ComponentType.StaticContent:
                case FieldType.Date:
                case FieldType.Duration:
                case FieldType.Uri:
                    return <WithTopSmallMg>{formChild}</WithTopSmallMg>;
                default:
                    return formChild;
            }
        } else {
            return formChild;
        }
    };

    return renderFormElement();
};
