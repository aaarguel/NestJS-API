import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(    
    private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'User was created'  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Token was generated'  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }
}
