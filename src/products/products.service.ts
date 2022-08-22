import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { NotOwnerException } from './exceptions/product.exception';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel( Product.name )
    private readonly productModel: Model<Product>
  ){

  }

  async findProductById(id:string){
    return await this.productModel.findOne({id});
  }

  async findOneAndUpdate(id:string, user:User,product2update:UpdateProductDto){
    return await this.productModel.findOneAndUpdate({_id:id,owner:user.id},product2update,{new:true});        
  }

  async removeByOwner(id:string, user:User){
    return await this.productModel.deleteOne({_id:id,owner:user.id})
  }
    
  async create(createProductDto: CreateProductDto,user: User) {    
    return await this.productModel.create({
      ...createProductDto,
      owner: user
    });;
  }

  async findAll() {    
    return await this.productModel.find().populate('owner');
  }  

  async update(id: string, updateProductDto: UpdateProductDto,user: User) { 
    const productUpdated = await this.findOneAndUpdate(id,user,updateProductDto);
    if(!productUpdated)
      throw new NotOwnerException();

    return productUpdated;    
  }

  async remove(id: string,user: User) {
    const deleted = await this.removeByOwner(id,user);
    if(deleted.deletedCount == 0)
      throw new NotOwnerException();
    
    return {
      message: `Product with id:${id} was deleted`
    };
  }
}
