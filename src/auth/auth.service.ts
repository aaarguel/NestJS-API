import {  BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { PasswordInvalidException, UserExistsException, UserNotExistsException } from './exceptions/user.exception';
import { LoginUserDto,CreateUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ){

  }

  async findUserByEmail(email:string){
    return await this.userModel.findOne({email}).select('+password');
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const userRegistered = await this.findUserByEmail(userData.email);
      
    if(userRegistered){
      throw new UserExistsException();
    }
    
    const user = await this.userModel.create({
      ...userData,
      password: bcrypt.hashSync( password, 10 ),
    });            
    
    return { 
      name: user.name,
      email: user.email
    };    
  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.findUserByEmail(email);

    if ( !user ) 
      throw new UserNotExistsException();
        
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new PasswordInvalidException();

    
    return {
      name: user.name,
      email: user.email,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }
  
}
