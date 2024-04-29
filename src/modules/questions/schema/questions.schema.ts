import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type QuestionsDocument = Questions & mongoose.Document;

@Schema()
export class QuestionOption {
  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  status: boolean;
}

@Schema()
export class Questions {
  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus' })
  syllabusId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teachers' })
  teacherId: mongoose.Types.ObjectId;

  @Prop({ type: [QuestionOption], default: [] })
  options: QuestionOption[]; // Lista de opciones de respuesta
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
