import { IParticipant } from "../AppState/MessagingHubState/Interfaces/IParticipant";
import { RequestModule } from "../RequestModule/RequestModule";

type MyWorkTasks = {
    data: Partial<ITaskData>;
    success: boolean;
}

interface ITaskData {
    allowSubtasks: boolean;
    assignee: boolean;
    avaiable: boolean;
    canReassign: boolean;
    canReopen: boolean;
    container: Partial<TaskContainer>;
    creationDate: Date;
    creator: Partial<Creator>;
    disableSubmit: boolean;
    formId: string;
    id: string;
    isContainerAdmin: true;
    parent: Partial<Parent>;
    recordAccessDenied: boolean;
    recordId: string;
    recordTypeId: string;
    status: Partial<Status>;
    title: string;
    type: string;
};

type TaskContainer = {
    id: string;
    name: string;
};

type Creator = {
    id: string
};

type Parent = {
    id: string;
    name: string;
    type: string;
};

type Status = {
    id: string;
    name: string;
};

export class MyWorkTasksController {

    public static async getTask(taskId: string): Promise<MyWorkTasks> {
        const res = await RequestModule.send("/MyWorkTasks/GetTask", "POST", {
            taskId: taskId
        });
        const result: MyWorkTasks = await res.json();
        return result
    }

}