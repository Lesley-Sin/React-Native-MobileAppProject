import { IModulesMediator } from "../../../AppMediator/Interfaces/IModulesMediator";
import { FieldType } from "../../Enums/FieldType";
import { BooleanComponent } from '../../InputFields/CheckBox/Boolean/BooleanComponent';
import { DateTimeComponent } from "../../InputFields/DateTime/DateTimeComponent";
import { DurationComponent } from "../../InputFields/Duration/DurationComponent";
import { HyperLinkComponent } from "../../InputFields/HyperLink/HyperLinkComponent";
import { NumberComponent } from "../../InputFields/Number/NumberComponent";
import { StaticContentComponent } from "../../InputFields/StaticContent/StaticContentComponent";
import { TextInputView } from "../../InputFields/TextComponents/Views/TextInputView";
import { DateFieldComponent, FieldComponent, IBoolean, NumberFieldComponent, ReferenceFieldComponent, StaticContentModel, TableFieldComponentModel, TextFieldComponent, UriFieldComponent } from "../../Interfaces/FieldComponent";
import { FormComponentView } from '../../Page/Form/FormComponentView';
import { ReferenceWidget } from "../../ReferenceFormWidgets/ReferenceWidget";
import { TableFieldComponent } from "../../TableComponent/TableFieldComponent";
import { EmptyView } from './Empty';

export class FieldComponentView extends FieldComponent {
    public instanceType: 'FieldComponentView' = 'FieldComponentView';
    private info: FieldComponent;
    private parentForm: FormComponentView;
    private mediator: IModulesMediator;
    constructor(info: FieldComponent, parentForm: FormComponentView, mediator: IModulesMediator) {
        super()
        this.info = info;
        this.parentForm = parentForm;
        this.mediator = mediator;
    };

    public createFieldComponent() {
        const type = this.info.fieldType
        switch (type) {
            case FieldType.Undefined: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Account: {
                const element = new EmptyView();
                return element
            };
            case FieldType.ActionButton: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Boolean: {
                return new BooleanComponent(this.info as IBoolean, this.parentForm);
            };
            case FieldType.CarouselLayout: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Chart: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Date: {
                const element = new DateTimeComponent(this.info as DateFieldComponent, this.parentForm);
                return element
            };
            case FieldType.Duration: {
                const element = new DurationComponent(this.info, this.parentForm);
                return element
            };
            case FieldType.Enum: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Icon: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Image: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Number: {
                const element = new NumberComponent(this.info as NumberFieldComponent, this.parentForm);
                return element
            };
            case FieldType.Reference: {
                const element = new ReferenceWidget(this.info as ReferenceFieldComponent, this.parentForm);
                return element
            };
            case FieldType.Showcase: {
                const element = new EmptyView();
                return element
            };
            case FieldType.StaticContent: {
                return new StaticContentComponent(this.info as StaticContentModel);
            };
            case FieldType.Text: {
                return new TextInputView(this.info as TextFieldComponent, this.parentForm)
            };
            case FieldType.Tile: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Timeline: {
                const element = new EmptyView();
                return element
            };
            case FieldType.Uri: {
                const element = new HyperLinkComponent(this.info as UriFieldComponent, this.parentForm);
                return element
            };
            case FieldType.Table: {
                return new TableFieldComponent(this.info as TableFieldComponentModel, this.parentForm, this.mediator)
            };
            default: return new EmptyView();
        }
    };

    public create() {
        return this.createFieldComponent()
    }

};