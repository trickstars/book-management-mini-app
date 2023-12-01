import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({required: true})
    title: string;

    @Prop({type: [String], required: true})
    author: string[];

    @Prop({required: true})
    publisher: string;

    @Prop({ default: Date.now()})
    publish_date: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);