import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTSECRET,
      passReqToCallback: true,
    });
  }

  async validate(data: {email}):Promise<User> {
    const {email} = data;
    const user = await this.userService.findEmail(email);
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoints')
    }
    return user;


  }

}
