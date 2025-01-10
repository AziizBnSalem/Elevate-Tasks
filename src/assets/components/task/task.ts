export interface ITask {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

export class Task implements ITask {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public completed: boolean = false,
        public createdAt: Date = new Date(),
        public updatedAt?: Date
    ) {}
}
