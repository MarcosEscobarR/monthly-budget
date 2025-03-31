import { RpcException } from '@nestjs/microservices';

export class Result<T> {
  constructor(
    private readonly value?: T,
    private readonly error?: Error,
  ) {}
  public static ok<T>(value: T, statusCode: number = 200): Result<T> {
    return new Result(value);
  }

  public static onError<T>(
    message: string,
    statusCode: number = 400,
  ): Result<T> {
    return new Result<T>(undefined, new RpcException(message));
  }

  public toResultValue() {
    const data = {
      body: this.formatBody(),
    };

    return data;
  }

  private formatBody() {
    if (this.error) {
      return {
        message: this.error.message,
      };
    }

    return this.value;
  }
}
