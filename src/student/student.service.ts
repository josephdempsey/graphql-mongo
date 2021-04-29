import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents() {
    return this.studentRepository.find();
  }

  async getStudent(id: string) {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(createStudentInput: CreateStudentInput) {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }
}
