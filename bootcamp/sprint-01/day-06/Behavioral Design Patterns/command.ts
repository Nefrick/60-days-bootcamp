class User {
    constructor(public userId: number) {}
}

class CommandHistory {
    public history: Command[] = [];

    addCommand(command: Command): void {
        this.history.push(command);
    }

    getHistory(): Command[] {
        return this.history;
    }

    removeCommand(command: Command): void {
        this.history = this.history.filter(cmd => cmd.commandId !== command.commandId); 
    }
}

abstract class Command {

    public commandId: number = Math.floor(Math.random() * 1000);

    protected userService: UserService;

    abstract execute(user: User): void;

    constructor(public history: CommandHistory, userService: UserService) {
        this.userService = userService;
    }
}

class UserService {
    saveUser(user: User): void {
        console.log(`User with ID ${user.userId} has been saved.`);
    }

    deleteUser(user: User): void {
        console.log(`User with ID ${user.userId} has been deleted.`);
    }
}

class AddUserCommand extends Command {

    constructor(
        history: CommandHistory, 
        private receiver: UserService, 
        private user: User) {
        super(history, receiver);
    }

    execute(): void {
        this.receiver.saveUser(this.user);
        this.history.addCommand(this);
    }

    undo(): void {
        this.receiver.deleteUser(this.user);
        this.history.removeCommand(this);
    }
}


class Controller {

    reveiver: UserService;

    constructor(reveiver: UserService) {
        this.reveiver = reveiver;
    }

    addReceiver(receiver: UserService): void {
        this.reveiver = receiver;
    }

    run(): void {
        const addUserCommand = new AddUserCommand(new CommandHistory(), this.reveiver, new User(1));
        addUserCommand.execute();
        console.log("Command History after execution:", addUserCommand.history.getHistory());
        addUserCommand.undo();
        console.log("Command History after undo:", addUserCommand.history.getHistory());
    }
}

const userService = new UserService();
const controller = new Controller(userService);
controller.run();