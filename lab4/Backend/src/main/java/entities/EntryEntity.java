package entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.*;

@Entity
@ToString
@NoArgsConstructor
@Table(name="lab4entries")
public class EntryEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    
    @Column(name = "x", nullable = false)
    private Double x;
    @Column(name = "y", nullable = false)
    private Double y;
    @Column(name = "r", nullable = false)
    private Double r;
    @Column(name = "isHit", nullable = false)
    private Boolean isHit;
    @Column(name = "time", nullable = false)
    private LocalDateTime attemptTime;
    @Column(name="username", nullable = false)
    private String username;

    public EntryEntity(EntryEntity entry) {
        this.x = entry.x;
        this.y = entry.y;
        this.r = entry.r;
        this.isHit = entry.isHit;
        this.attemptTime = entry.attemptTime; 
        this.username = entry.username;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public Boolean getIsHit() {
        return isHit;
    }

    public LocalDateTime getAttemptTime() {
        return attemptTime;
    }

    public String getUsername() {
        return username;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void setIsHit(Boolean isHit) {
        this.isHit = isHit;
    }
       
    public void setAttemptTime(LocalDateTime attemptTime) {
        this.attemptTime = attemptTime;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getResult() {
        if(isHit){
            return "HIT";
        } else {
            return "miss";
        }
    }
}