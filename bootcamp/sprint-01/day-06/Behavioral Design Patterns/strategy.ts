class User {
    gitHubToken: string;
    jwrToken: string;

    constructor(gitHubToken: string, jwrToken: string) {
        this.gitHubToken = gitHubToken;
        this.jwrToken = jwrToken;
    }
}

interface AuthStrategy {
    authenticate(user: User): void;
}

class Auth {
    constructor(private strategy: AuthStrategy) {}

    setStrategy(strategy: AuthStrategy) {
        this.strategy = strategy;
    }

    public authenticate(user: User) {
        this.strategy.authenticate(user);
    }

}

class JWTAuthStrategy implements AuthStrategy {
    authenticate(user: User): void {
        console.log(`Authenticating user with JWT token: ${user.jwrToken}`);
        // Implement JWT authentication logic here
    }
}

class GitHubAuthStrategy implements AuthStrategy {
    authenticate(user: User): void {
        console.log(`Authenticating user with GitHub token: ${user.gitHubToken}`);
        // Implement GitHub authentication logic here
    }
}

const user = new User('github-token-123', 'jwt-token-456');
const auth = new Auth(new JWTAuthStrategy());
auth.authenticate(user); // Output: Authenticating user with JWT token: jwt-token-456
auth.setStrategy(new GitHubAuthStrategy());
auth.authenticate(user); // Output: Authenticating user with GitHub token: github-token-123 

