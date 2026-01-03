import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // Configure JWT validation
        const checkJwt = expressjwt({
            secret: expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
        });

        try {
            await promisify(checkJwt)(request, {} as any);
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
