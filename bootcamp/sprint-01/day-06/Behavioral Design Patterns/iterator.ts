class Task {
    constructor(public priority: number, public name: string, public completed: boolean) {}
}

class Tasklist {
    private tasks: Task[] = [];

    public sortByPriority(): Task[] {
        return [...this.tasks].sort((a, b) => b.priority - a.priority);
    }

    public addTask(task: Task): void {
        this.tasks.push(task);
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    public count(): number {
        return this.tasks.length;
    }

}

interface IIterator<T> {
    next(): T | undefined;
    current(): T | undefined;
    prev(): T | undefined;
    reset(): void;
    index(): number;
}

class PriorityIterator implements IIterator<Task> {
    private indexValue: number = 0;
    private sortedTasks: Task[];
    
    constructor(private tasklist: Tasklist) {
        this.sortedTasks = this.tasklist.sortByPriority();
    }  
    
    public next(): Task | undefined {
        return this.sortedTasks[this.indexValue++];
    }

    public current(): Task | undefined {
        return this.sortedTasks[this.indexValue];
    }

    public prev(): Task | undefined {
        return this.sortedTasks[this.indexValue--];
    }

    public reset(): void {
        this.indexValue = 0;
    }

    public index(): number {
        return this.indexValue;
    }
}


const tasklist = new Tasklist();
tasklist.addTask(new Task(1, "Task 1", false));
tasklist.addTask(new Task(3, "Task 2", true));
tasklist.addTask(new Task(2, "Task 3", false));

const iterator = new PriorityIterator(tasklist);
while (iterator.index() < tasklist.count()) {
    const task = iterator.next();
    if (task) {
        console.log(`${task.name} - Priority: ${task.priority}`);
    }
}

