interface IValidationError {
  target: object;
  property: string;
  value: any;
  constraints: {
    [key: string]: string;
  };
}

interface IServerError {
  message: string;
  stack: string;
}

interface IServer {
  id: string;
  name: string;
}

interface IChannel {
  id: string;
  name: string;
}

interface IUser {
  id: string;
  username: string;
}

interface IMessage {
  id: string;
  text: string;
  user: IUser
}

export type { IValidationError, IServerError, IServer, IChannel, IUser, IMessage };
