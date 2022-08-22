import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
    @Prop()
    @ApiProperty({description:"Name of user"})
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    @ApiProperty({description:"Email of user"})
    email: string;

    @Prop({select:false})
    @ApiProperty({description:"PasswordHash of user"})
    password: string;

}

export const UserSchema = SchemaFactory.createForClass( User );