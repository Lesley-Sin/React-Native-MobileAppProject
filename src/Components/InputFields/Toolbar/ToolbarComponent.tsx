import EventEmitter from 'events';
import React from 'react';
import { View } from 'react-native';
import { margins } from '../../../globalStyles/constants';
import { flexBoxRow } from '../../../globalStyles/flexBox';
import type { IUserCommandExecutionService } from '../../../UserCommandExecutionService/Models/IUserCommandExecutionService';
import { UPDATE_TOOLBAR_EVENT } from '../../Interfaces/Constants';
import { WidgetValues } from '../../Interfaces/DataformWidgetsQuery';
import { FormWidget } from '../../Interfaces/FieldComponent';
import { Toolbar } from '../../Interfaces/Toolbar';
import type { FormComponentView } from '../../Page/Form/FormComponentView';
import { ToolbarItemView } from './Interfaces/ToolbarItemView';
import { ToolbarView } from './ToolbarView';

export class ToolbarComponent extends Toolbar implements FormWidget {
    private props: Toolbar | undefined;
    public instanceType: 'ToolbarComponent' = 'ToolbarComponent';
    private emitter = new EventEmitter();
    private contextSender: FormComponentView;
    private ucmdService: IUserCommandExecutionService;

    constructor(props: Toolbar | undefined, ucmdService: IUserCommandExecutionService, contextSender: FormComponentView) {
        super();
        this.props = props;
        this.ucmdService = ucmdService;
        this.contextSender = contextSender;
    }

    public updateComponent(values: WidgetValues | ToolbarItemView[]): void {
        if (values instanceof WidgetValues) {
            return;
        }
        if (this.props) {
            this.emitter.emit(UPDATE_TOOLBAR_EVENT + this.props.id, values);
        } else {
            this.emitter.emit(`${UPDATE_TOOLBAR_EVENT}0`, values);
        }
    }

    public create() {
        return this.props?.items.length ? (
            <View style={flexBoxRow.FlexStartCenter}>
                {this.props?.items?.map((toolbarItem, i) => {
                    return (
                        <View style={{ marginLeft: i > 0 ? margins.deafaultMargins : 0 }} key={i} >
                            <ToolbarView toolbarItem={toolbarItem} emitter={this.emitter} id={this.props ? this.props.id : '0'} ucmdService={this.ucmdService} contextSender={this.contextSender} />
                        </View>
                    );
                })}
            </View>
        ) : (
            <View >
                <ToolbarView toolbarItem={undefined} emitter={this.emitter} id={'0'} ucmdService={this.ucmdService} contextSender={this.contextSender} />
            </View>
        );
    }
}
