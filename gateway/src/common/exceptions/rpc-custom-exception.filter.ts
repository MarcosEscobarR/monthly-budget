import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();

    if (exception instanceof RpcException) {
      Logger.error(exception.getError(), exception.stack, 'RPC Exception');

      const error = exception.getError();
      const message =
        typeof error === 'string'
          ? error
          : // @ts-ignore
            error?.message || 'Internal server error';

      console.log(message);
      throw new Error(message);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      throw new Error(
        typeof response === 'string' ? response : response['message'],
      );
    }

    Logger.error(exception);
    throw new Error('Internal server error');
  }
}
