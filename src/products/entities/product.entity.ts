import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/entities/user.entity";

@Schema()
export class Product extends Document {
    @Prop({ required:true})
    @ApiProperty({description:'name of product'})
    name: string;

    @Prop({ required:true})    
    @ApiProperty({description:'price of product'})
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    @ApiProperty({description:'Ref of User'})
    @Type(() => User)
    owner: User;
}

export const ProductSchema = SchemaFactory.createForClass( Product );