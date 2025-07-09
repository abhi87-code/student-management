package com.studentManagement.demo.Controller;

import com.studentManagement.demo.DTO.StudentRequest;
import com.studentManagement.demo.DTO.UserResponse;
import com.studentManagement.demo.DTO.GetBookByIdResponse;
import com.studentManagement.demo.Entities.Student;
import com.studentManagement.demo.Services.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/"})
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    // Helper method to check if the current user is ADMIN
    private boolean isAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    @GetMapping("/students")
    public ResponseEntity<List<UserResponse>> getStudents() {
        List<UserResponse> list = studentServices.getAllstudents();
        if (list.size() <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.of(Optional.of(list));
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<GetBookByIdResponse> getOneStudent(@PathVariable("id") int id) {
        GetBookByIdResponse s = studentServices.getStudentById(id);
        if (s == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.of(Optional.of(s));
    }

    @GetMapping("/student/search")
    public ResponseEntity<List<UserResponse>> searchStudents(@RequestParam String query) {
        List<UserResponse> result = studentServices.searchStudents(query);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/student/add")
    public ResponseEntity<?> addStudent(@RequestBody StudentRequest studentRequest) {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        try {
            studentServices.addStudent(studentRequest);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<?> updateStudentById(@RequestBody StudentRequest studentRequest, @PathVariable("id") int id) {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        try {
            studentServices.updateStudent(studentRequest, id);
            return ResponseEntity.ok().body(studentRequest);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<Void> deleteStudentById(@PathVariable("id") int id) {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        try {
            studentServices.deleteStudentById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping("/students")
    public ResponseEntity<Void> deleteAllStudent() {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        try {
            studentServices.deleteAll();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
