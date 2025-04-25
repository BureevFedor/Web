package entities;

import javax.persistence.*;

@Entity
@Table(name="lab4users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username")
    private String username;
    
    @Column(name = "password")
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
