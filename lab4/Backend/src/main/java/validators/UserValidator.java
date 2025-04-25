package validators;

public class UserValidator {

    public boolean validateLoginData(String username, String password) {
        return (username.length() >= 5) &&
                (username.length() <= 20) &&
                (password.length() >= 5) &&
                (password.length() <= 20);
    }

    public boolean validateSignUpData(String username, String password) {
        return (username.length() >= 5) &&
                (username.length() <= 20) &&
                (password.length() >= 5) &&
                (password.length() <= 20);
    }
}