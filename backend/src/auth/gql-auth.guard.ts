import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        // Create HTTP context for the parent AuthGuard
        const httpContext = {
            switchToHttp: () => ({
                getRequest: () => req,
            }),
        } as ExecutionContext;

        return super.canActivate(httpContext);
    }
}
