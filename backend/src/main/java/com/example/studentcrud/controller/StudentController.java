package com.example.studentcrud.controller;

import com.example.studentcrud.dto.CreateStudentRequest;
import com.example.studentcrud.dto.UpdateStudentRequest;
import com.example.studentcrud.entity.Student;
import com.example.studentcrud.exceptionhandler.ResourceNotFoundException;
import com.example.studentcrud.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost"})
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student createStudent(
            @Valid @RequestBody CreateStudentRequest request) {

        Student student = new Student();

        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setEmail(request.getEmail());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setAddress(request.getAddress());
        student.setEnrollmentDate(request.getEnrollmentDate());
        student.setMajor(request.getMajor());
        student.setPassword(request.getPassword());

        return studentService.createStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        Student student = studentService.getStudentById(id);

        if (student == null) {
            throw new ResourceNotFoundException(
                    "Student with ID " + id + " not found"
            );
        }

        return student;
    }

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable String id,
            @Valid @RequestBody UpdateStudentRequest request) {

        Student student = new Student();

        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setEmail(request.getEmail());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setAddress(request.getAddress());
        student.setEnrollmentDate(request.getEnrollmentDate());
        student.setMajor(request.getMajor());

        Student updatedStudent =
                studentService.updateStudent(id, student);

        if (updatedStudent == null) {
            throw new ResourceNotFoundException(
                    "Student with ID " + id + " not found"
            );
        }

        return updatedStudent;
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable String id) {

        Student student = studentService.getStudentById(id);

        if (student == null) {
            throw new ResourceNotFoundException(
                    "Student with ID " + id + " not found"
            );
        }

        studentService.deleteStudent(id);
    }
}