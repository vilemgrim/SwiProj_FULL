package cz.osu.team25.swiproject.service;

import cz.osu.team25.swiproject.model.User;
import cz.osu.team25.swiproject.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List; // ← přidáno
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Hardcoded admin účty
    private final Set<String> hardcodedAdmins = Set.of(
            "admin1",
            "admin2",
            "admin3"
    );

    // Jeden jediný superadmin účet
    private final String SUPERADMIN = "root";

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Pomocná metoda – ověření superadmina
    public boolean isSuperAdmin(String username) {
        return username.equals(SUPERADMIN);
    }

    // Registrace – nastaví admina, pokud je to hardcoded účet nebo superadmin
    public boolean register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return false;
        }

        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());

        User user = new User();
        user.setUsername(username);
        user.setPassword(hashed);

        // Nastavení admin role
        if (hardcodedAdmins.contains(username) || isSuperAdmin(username)) {
            user.setAdmin(true);
        }

        userRepository.save(user);
        return true;
    }

    public boolean changeUserPassword(String username, String oldPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        // Ověření starého hesla
        if (!BCrypt.checkpw(oldPassword, user.getPassword())) {
            return false;
        }

        // Zašifrování nového hesla
        String hashedNewPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());

        user.setPassword(hashedNewPassword);
        userRepository.save(user);

        return true;
    }

    // Login – vrací true/false
    public boolean login(String username, String password) {
        return userRepository.findByUsername(username)
                .map(user -> BCrypt.checkpw(password, user.getPassword()))
                .orElse(false);
    }

    // Vrátí uživatele (pro získání role)
    public User getUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    // 🔥 Vrátí všechny uživatele (pro admin panel)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Admin nebo superadmin může povýšit jiného uživatele na admina
    public boolean makeAdmin(String caller, String targetUser) {

        // Ověření oprávnění
        if (!hardcodedAdmins.contains(caller) && !isSuperAdmin(caller)) {
            return false;
        }

        Optional<User> user = userRepository.findByUsername(targetUser);

        if (user.isEmpty()) {
            return false;
        }

        user.get().setAdmin(true);
        userRepository.save(user.get());

        return true;
    }

    // Superadmin může odebrat admin práva
    public boolean removeAdmin(String caller, String targetUser) {

        // Jen superadmin může odebírat admin práva
        if (!isSuperAdmin(caller)) {
            return false;
        }

        Optional<User> user = userRepository.findByUsername(targetUser);

        if (user.isEmpty()) {
            return false;
        }

        user.get().setAdmin(false);
        userRepository.save(user.get());

        return true;
    }
}
