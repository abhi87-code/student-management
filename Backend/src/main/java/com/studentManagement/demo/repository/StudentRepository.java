package com.studentManagement.demo.repository;

import com.studentManagement.demo.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {

    @Query("SELECT s FROM Student s WHERE " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(s.branch) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "CAST(s.roll_Number AS string) LIKE CONCAT('%', :query, '%')")
    List<Student> searchByNameOrBranchOrRoll(@Param("query") String query);

}
