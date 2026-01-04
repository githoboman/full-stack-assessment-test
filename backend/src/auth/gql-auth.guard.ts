import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class GqlAuthGuard extends AuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, res } = ctx.getContext();

    // Create HTTP-like context for the parent AuthGuard
    const httpContext = {
      switchToHttp: () => ({
        getRequest: () => req,
        getResponse: () => res,
      }),
      getType: () => context.getType(),
      getHandler: () => context.getHandler(),
      getClass: () => context.getClass(),
      getArgs: () => context.getArgs(),
    } as unknown as ExecutionContext;

    return super.canActivate(httpContext);
  }
}
