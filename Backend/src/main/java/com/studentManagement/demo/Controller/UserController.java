package com.studentManagement.demo.Controller;

import com.studentManagement.demo.Entities.User;
import com.studentManagement.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private boolean isAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    // List all users (admin only)
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        if (!isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        List<User> users = userRepository.findAll();
        // Hide password in response
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    // Change a user's role (admin only)
    @PutMapping("/{username}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable String username, @RequestBody Map<String, String> body) {
        if (!isAdmin()) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        User user = userRepository.findByUsername(username);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        String newRole = body.get("role");
        if (!"ADMIN".equals(newRole) && !"USER".equals(newRole)) {
            return ResponseEntity.badRequest().body("Invalid role");
        }
        user.setRole(newRole);
        userRepository.save(user);
        return ResponseEntity.ok("Role updated");
    }
}
