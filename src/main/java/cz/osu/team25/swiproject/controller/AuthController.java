package cz.osu.team25.swiproject.controller;

import cz.osu.team25.swiproject.model.User;
import cz.osu.team25.swiproject.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public boolean register(@RequestParam String username, @RequestParam String password) {
        return userService.register(username, password);
    }

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

    @PostMapping("/change-password")
    public ResponseEntity<Boolean> changePassword(
            @RequestParam String username,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        // Zavoláme mozek (UserService), který jsme vytvořili v kroku 2
        boolean success = userService.changeUserPassword(username, oldPassword, newPassword);

        if (success) {
            return ResponseEntity.ok(true);
        } else {
            // Vrátíme false (nebo můžete vrátit 400 Bad Request), pokud heslo nesedí
            return ResponseEntity.ok(false);
        }
    }
}
