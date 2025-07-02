package com.studentManagement.demo.Services;

import com.studentManagement.demo.DTO.StudentRequest;
import com.studentManagement.demo.DTO.UserResponse;
import com.studentManagement.demo.DTO.GetBookByIdResponse;
import com.studentManagement.demo.Entities.Student;
import com.studentManagement.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServices {
    @Autowired
    private StudentRepository studentRepository;

    public StudentRequest addStudent(StudentRequest studentRequest){
        Student result=StudentRequestMapper(studentRequest);
                studentRepository.save(result);
        return studentRequest;
    }


    public List<UserResponse> getAllstudents(){
        List<Student> studentList=studentRepository.findAll();
        List<UserResponse> allBooksResponses=new ArrayList<>();
        for(Student student:studentList){
            allBooksResponses.add(ResponseMapper(student));
        }
        return allBooksResponses;
    }

    UserResponse ResponseMapper(Student student) {
        return new UserResponse.Builder()
                .roll_Number(student.getRoll_Number())
                .name(student.getName())
                .percentage(student.getPercentage())
                .branch(student.getBranch())
                .build();
    }


    public List<UserResponse> searchStudents(String query) {
        List<Student> students = studentRepository.searchByNameOrBranchOrRoll(query);
        return students.stream()
                .map(this::ResponseMapper)
                .collect(Collectors.toList());
    }




    public GetBookByIdResponse getStudentById(int id){
        Student s= this.studentRepository.findById(id).orElse(null);
        GetBookByIdResponse getBookByIdResponse=GetBookByIdResponseMapper(s);
        return getBookByIdResponse;

    }


    GetBookByIdResponse GetBookByIdResponseMapper(Student student){
        return new GetBookByIdResponse.Builder()
                .roll_Number(student.getRoll_Number())
                .name(student.getName())
                .branch(student.getBranch())
                .percentage(student.getPercentage())
                .build();

    }

    public void deleteStudentById(int id){
       studentRepository.deleteById(id);
    }

    public void deleteAll(){
        studentRepository.deleteAll();
    }

    public StudentRequest updateStudent(StudentRequest studentRequest,int id){
        studentRequest.setRoll_Number(id);
        Student s=StudentRequestMapper(studentRequest);
        studentRepository.save(s);
        return studentRequest;
    }


    Student StudentRequestMapper(StudentRequest studentRequest) {
        return new Student.Builder()
                .roll_Number(studentRequest.getRoll_Number())
                .name(studentRequest.getName())
                .branch(studentRequest.getBranch())
                .percentage(studentRequest.getPercentage())
                .contactNumber(studentRequest.getContactNumber())
                .build();
    }

}
