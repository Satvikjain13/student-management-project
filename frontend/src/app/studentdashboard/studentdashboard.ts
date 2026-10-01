import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/studentservice';
import { Student } from '../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentdashboard',
  imports: [FormsModule],
  templateUrl: './studentdashboard.html',
  styleUrl: './studentdashboard.css',
})
export class Studentdashboard {

  students = signal<Student[]>([]);
  editingStudentId: string | null = null;

  firstName = '';
  lastName = '';
  dateOfBirth = '';
  email = '';
  phoneNumber = '';
  address = '';
  enrollmentDate = '';
  major = '';
  password = '';

  firstNameError = signal('');
  lastNameError = signal('');
  dateOfBirthError = signal('');
  emailError = signal('');
  phoneNumberError = signal('');
  addressError = signal('');
  enrollmentDateError = signal('');
  majorError = signal('');
  passwordError = signal('');

  constructor(private studentService: StudentService,
    private router: Router
  ) {}

  createStudent() {

    this.clearErrors();

    this.validateForm();

    if (
      this.firstNameError() ||
      this.lastNameError() ||
      this.dateOfBirthError() ||
      this.emailError() ||
      this.phoneNumberError() ||
      this.addressError() ||
      this.enrollmentDateError() ||
      this.majorError() ||
      this.passwordError()
    ) {
      return;
    }

    if (this.editingStudentId) {

      const updatedStudent: Student = {
        firstName: this.firstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        enrollmentDate: this.enrollmentDate,
        major: this.major
      };

      this.studentService.updateStudent(
        this.editingStudentId,
        updatedStudent
      ).subscribe({
        next: response => {
          console.log(response);
          this.editingStudentId = null;
          this.password = '';
          this.findAllStudents();
        },
        error: error => {
          this.showBackendErrors(error);
        }
      });

      return;
    }

    const student: Student = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      enrollmentDate: this.enrollmentDate,
      major: this.major,
      password: this.password
    };

    this.studentService.createStudent(student).subscribe({
      next: response => {
        console.log(response);
        this.findAllStudents();
        this.clearForm();
      },
      error: error => {
        this.showBackendErrors(error);
      }
    });
  }

  validateForm() {

    if (!this.firstName.trim()) {
      this.firstNameError.set('First name is required');
    }

    if (!this.lastName.trim()) {
      this.lastNameError.set('Last name is required');
    }

    if (!this.dateOfBirth) {
      this.dateOfBirthError.set('Date of birth is required');
    }

    if (!this.email.trim()) {
      this.emailError.set('Email is required');
    }

    if (!this.phoneNumber.trim()) {
      this.phoneNumberError.set('Phone number is required');
    }

    if (!this.address.trim()) {
      this.addressError.set('Address is required');
    }

    if (!this.enrollmentDate) {
      this.enrollmentDateError.set('Enrollment date is required');
    }

    if (!this.major.trim()) {
      this.majorError.set('Major is required');
    }

    if (!this.editingStudentId && !this.password.trim()) {
      this.passwordError.set('Password is required');
    }
  }

  clearErrors() {
    this.firstNameError.set('');
    this.lastNameError.set('');
    this.dateOfBirthError.set('');
    this.emailError.set('');
    this.phoneNumberError.set('');
    this.addressError.set('');
    this.enrollmentDateError.set('');
    this.majorError.set('');
    this.passwordError.set('');
  }

  showBackendErrors(error: any) {

    this.clearErrors();

    const errors = error.error?.errors;

    if (!errors) {
      console.log(error);
      return;
    }

    if (errors.firstName) {
      this.firstNameError.set(errors.firstName[0]);
    }

    if (errors.lastName) {
      this.lastNameError.set(errors.lastName[0]);
    }

    if (errors.dateOfBirth) {
      this.dateOfBirthError.set(errors.dateOfBirth[0]);
    }

    if (errors.email) {
      this.emailError.set(errors.email[0]);
    }

    if (errors.phoneNumber) {
      this.phoneNumberError.set(errors.phoneNumber[0]);
    }

    if (errors.address) {
      this.addressError.set(errors.address[0]);
    }

    if (errors.enrollmentDate) {
      this.enrollmentDateError.set(errors.enrollmentDate[0]);
    }

    if (errors.major) {
      this.majorError.set(errors.major[0]);
    }

    if (errors.password) {
      this.passwordError.set(errors.password[0]);
    }
  }

  findAllStudents() {

    this.studentService.getAllStudents().subscribe({
      next: response => {
        console.log('Students:', response);
        this.students.set(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  editStudent(student: Student) {

    this.editingStudentId = student.id ?? null;

    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.dateOfBirth = student.dateOfBirth;
    this.email = student.email;
    this.phoneNumber = student.phoneNumber;
    this.address = student.address;
    this.enrollmentDate = student.enrollmentDate;
    this.major = student.major;
    this.password = '';

    this.clearErrors();
  }

  deleteStudent(id: string) {

    this.studentService.deleteStudent(id).subscribe({
      next: response => {
        console.log(response);
        this.findAllStudents();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  clearForm() {

    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.email = '';
    this.phoneNumber = '';
    this.address = '';
    this.enrollmentDate = '';
    this.major = '';
    this.password = '';

    this.editingStudentId = null;

    this.clearErrors();
  }
  logout() {
  this.router.navigate(['/login']);
}
}