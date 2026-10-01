import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  constructor(private http: HttpClient) {}

  createStudent(student: Student) {
    return this.http.post(
      '/students',
      student
    );
  }

  getAllStudents() {
    return this.http.get<Student[]>(
      '/students'
    );
  }

  getStudent(id: string) {
    return this.http.get<Student>(
      `/students/${id}`
    );
  }

  updateStudent(id: string, student: Student) {
    return this.http.put(
      `/students/${id}`,
      student
    );
  }

  deleteStudent(id: string) {
    return this.http.delete(
      `/students/${id}`
    );
  }
}