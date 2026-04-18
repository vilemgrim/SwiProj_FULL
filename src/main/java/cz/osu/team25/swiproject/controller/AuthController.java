package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.model.User;
import cz.osu.team25.swiproject.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Registrace
    @PostMapping("/register")
    public boolean register(@RequestParam String username, @RequestParam String password) {
        return userService.register(username, password);
    }

    // Login + role
    @PostMapping("/login-info")
    public Map<String, Object> loginInfo(@RequestParam String username, @RequestParam String password) {
        Map<String, Object> result = new HashMap<>();

        boolean success = userService.login(username, password);
        result.put("success", success);

        if (success) {
            User user = userService.getUser(username);
            result.put("admin", user.isAdmin());
        }

        return result;
    }

    // Změna hesla
    @PostMapping("/change-password")
    public ResponseEntity<Boolean> changePassword(
            @RequestParam String username,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        boolean success = userService.changeUserPassword(username, oldPassword, newPassword);

        return ResponseEntity.ok(success);
    }

    // 🔥 Seznam všech uživatelů
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🔥 Povýšení na admina
    @PostMapping("/make-admin")
    public boolean makeAdmin(
            @RequestParam String caller,
            @RequestParam String targetUser
    ) {
        return userService.makeAdmin(caller, targetUser);
    }

    // 🔥 Odebrání admina (jen superadmin)
    @PostMapping("/remove-admin")
    public boolean removeAdmin(
            @RequestParam String caller,
            @RequestParam String targetUser
    ) {
        return userService.removeAdmin(caller, targetUser);
    }
}
