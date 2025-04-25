package model;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import javax.persistence.*;

import lombok.*;

@Entity
@ToString
@NoArgsConstructor
@Table(name="entries")
public class Entry implements Serializable{

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

    public Entry(Double x, Double y, Double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = atArea(x, y, r);
        this.attemptTime = LocalDateTime.now();
    }

    public Entry(Entry entry) {
        this.x = entry.x;
        this.y = entry.y;
        this.r = entry.r;
        this.isHit = entry.isHit;
        this.attemptTime = entry.attemptTime; 
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

    public String getResult() {
        if(isHit){
            return "HIT";
        } else {
            return "miss";
        }
    }

    // Функция проверки валидности значений
    public boolean checkDataValid(double x, double y, double r){
        return checkX(x) && checkY(y) && checkR(r);
    }

    public boolean checkX(Double x) {
        List<Double> ArrayX = Arrays.asList(-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0);
        return ArrayX.contains(x);
    }

    public boolean checkY(Double y) {
        return ((y <= 3) && (y >= -3));
    }

    public boolean checkR(Double r) {
        List<Double> ArrayR = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);
        return ArrayR.contains(r);
    }

    // Функция проверки попадания точки на график
    public boolean atArea(double x, double y, double r){
        return
            ((x <= 0) && (x >= -r) && (y >= 0) && (y <= r)) || // Проверка попадания в прямоугольник (см. график)
            ((x <= 0) && (y <= 0) && (x * x + y * y <= r * r)) || // Проверка попадания в четверть круга  (см. график)
            ((x >= 0) && (x <= r) && (y <= 0) && (y >= -r/2 ) && (y >=  x/2 - r/2)); // Проверка попадания в треугольник (см. график)
    }
}