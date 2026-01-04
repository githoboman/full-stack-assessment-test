import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { expressjwt } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Configure JWT validation
    const checkJwt = expressjwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }) as any,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ["RS256"],
    });

    return new Promise((resolve, reject) => {
      checkJwt(request, response, (err: any) => {
        if (err) {
          console.error("JWT validation error:", err.message);
          reject(new UnauthorizedException("Invalid token"));
        } else {
          resolve(true);
        }
      });
    });
  }
}
