import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
  uid: string;
  email?: string;
  roles?: string[];
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
