package cz.osu.team25.swiproject.service;

import cz.osu.team25.swiproject.model.User;
import cz.osu.team25.swiproject.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.HashMap;
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

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Registrace – nastaví admina, pokud je to hardcoded účet
    public boolean register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return false;
        }

        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());

        User user = new User();
        user.setUsername(username);
        user.setPassword(hashed);

        // Nastavení admin role
        user.setAdmin(hardcodedAdmins.contains(username));

        userRepository.save(user);
        return true;
    }

    public boolean changeUserPassword(String username, String oldPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        // 1. ZMĚNA: Použijeme BCrypt pro ověření starého hesla (stejně jako u loginu)
        if (!BCrypt.checkpw(oldPassword, user.getPassword())) {
            return false; // Hesla nesedí, tady se to zastaví!
        }

        // 2. ZMĚNA: Nové heslo musíme před uložením do databáze ZAŠIFROVAT
        String hashedNewPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());

        // 3. Uložíme to zašifrované heslo
        user.setPassword(hashedNewPassword);
        userRepository.save(user);

        return true; // Úspěch, heslo bylo bezpečně změněno
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

    // Admin může povýšit jiného uživatele na admina
    public boolean makeAdmin(String caller, String targetUser) {

        // 1) ověř, že volající je admin
        if (!hardcodedAdmins.contains(caller)) {
            return false;
        }

        // 2) najdi cílového uživatele
        Optional<User> user = userRepository.findByUsername(targetUser);

        if (user.isEmpty()) {
            return false;
        }

        // 3) nastav admina
        user.get().setAdmin(true);
        userRepository.save(user.get());

        return true;
    }
}
