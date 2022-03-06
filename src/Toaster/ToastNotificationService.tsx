import EventEmitter from "events";
import { IUserCommandMessage } from "../UserCommandExecutionService/Models/IUserCommandResult";

export class ToastNotificationService {
    public emitter = new EventEmitter();

    public toastMessage(messageModel: IUserCommandMessage) {
        this.emitter.emit('toastMessage', messageModel)
    };

};