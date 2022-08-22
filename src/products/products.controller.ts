import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Create products by User', type: [Product]  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(@Body() createProductDto: CreateProductDto,
    @GetUser() user: User) {
    return this.productsService.create(createProductDto,user);
  }

  @Get()  
  @ApiResponse({ status: 200, description: 'List all products with user', type: [Product]  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll() {    
    return this.productsService.findAll();
  }

  @Patch(':id')   
  @Auth()
  @ApiResponse({ status: 200, description: 'Update user product'  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id', ParseMongoIdPipe ) id: string, 
    @Body() updateProductDto: UpdateProductDto, 
    @GetUser() user: User) {
    return this.productsService.update(id, updateProductDto,user);
  }


  @Delete(':id')
  @Auth()
  @ApiResponse({ status: 200, description: 'Delete a product owned by user'  })
  @ApiResponse({ status: 400, description: 'Bad request' })  
  remove(@Param('id', ParseMongoIdPipe ) id: string, 
    @GetUser() user: User) {
    return this.productsService.remove(id, user);
  }
}
