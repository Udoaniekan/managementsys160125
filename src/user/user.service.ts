import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { IncomingHttpHeaders } from 'http';
import { access } from 'fs';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  logout(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private JwtService:JwtService){}
  async create(data: CreateUserDto) {
    const {email, password, ...rest} = data;
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new HttpException('sorry user with this email already exists', 400)
  }
  const hashPassword = await argon2.hash(password);

  const userDetails = await this.userRepository.save({ 
    email, 
    password: hashPassword, 
    ...rest
  });

  delete userDetails.password;
  const Userdata = { id: userDetails.id, email: userDetails.email };
  return { 
    access_token: await this.JwtService.signAsync(Userdata),
  };
}


  create1(createUserDto: CreateUserDto) {
    
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findEmail(email){
    const userEmail = await this.userRepository.findOneByOrFail({ email})
    if(!userEmail){
      throw new HttpException('email already exists', 400)
    }
    return userEmail;
  }

  async user(headers: any) : Promise<any>{
  const authorizationHeader = headers.authorization; // it tries to extract the authorization header from the incoming request headers. This headers typically contains the token used to authentication,
  if (authorizationHeader) {
    const token = authorizationHeader.replace('Bearer ', ''); // it removes the 'Bearer ' prefix from the token string
    const secret = process.env.JWTSECRET; //checks if the authorization header exists. If not, it will skip to the else block and throw an error.
    try {
      const decoded = this.JwtService.verify(token);
      let id = decoded['id']; // AFTER verifying the token, the function extracts the user's id from the decoded token data.
      let user = await this.userRepository.findOneBy({ id });

      return { id: id, name: user.name, email: user.email, role: user.role };
    } catch (error) {
      throw new HttpException('Invalid token', 401); // if the token is invalid, it will throw an error with a 401 status code.
    }
  }else {
      throw new HttpException('Invalid or missing Bearer token', 401); // if the authorization header does not exist, it will throw an error with a 401 status code.
    }

    }
  }
