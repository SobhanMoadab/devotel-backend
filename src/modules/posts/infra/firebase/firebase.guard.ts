import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseConfigService } from './firebase.config';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseConfig: FirebaseConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;


    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decodedToken = await this.firebaseConfig
        .getAuthAdmin()
        .verifyIdToken(token);
      console.log({ decodedToken });

      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        roles: decodedToken.roles || [],
      };
      return true;
    } catch (error) {
      console.log({error})
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
