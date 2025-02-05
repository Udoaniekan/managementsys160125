import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    UserModule
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
