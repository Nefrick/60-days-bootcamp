interface IMiddleware {
  next(middleware: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  private nextMiddleware: IMiddleware | null = null;    

  next(middleware: IMiddleware): IMiddleware {
    this.nextMiddleware = middleware;
    return middleware;
  }

  handle(request: any): any {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request);
    }
    return request;
  }
}

class AuthMiddleware extends AbstractMiddleware {
  handle(request: any): any {
    console.log('AuthMiddleware: Checking authentication...');
    if (request.userId === 1) {
        return super.handle(request);
    }
    return {error: 'Unauthorized'};
  }
}

class ValidationMiddleware extends AbstractMiddleware {
  handle(request: any): any {
    console.log('ValidationMiddleware: Validating request...');
    if (request.body && request.body.length > 0) {
        return super.handle(request);
    }
    return {error: 'Invalid request'};
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any): any {
    console.log('Controller: Handling request...');
    return {success: true, data: 'Request processed successfully'};
  }
}

const controller = new Controller();
const validationMiddleware = new ValidationMiddleware();
const authMiddleware = new AuthMiddleware();

authMiddleware.next(validationMiddleware).next(controller);

console.log(authMiddleware.handle({userId: 1, body: 'Some data'})); // {success: true, data: 'Request processed successfully'}
console.log(authMiddleware.handle({userId: 2, body: 'Some data'}));