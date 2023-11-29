import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Book {
    @Prop({required: true})
    title: string;

    @Prop({type: [String], required: true})
    author: string[];

    @Prop({required: true})
    publisher: string;

    @Prop({required: true, default: Date.now()})
    publish_date: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);