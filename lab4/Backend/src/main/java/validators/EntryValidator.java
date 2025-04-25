package validators;

import java.util.Arrays;
import java.util.List;

public class EntryValidator {

    // Функция проверки валидности значений
    public boolean checkDataValid(double x, double y, double r){
        return checkX(x) && checkY(y) && checkR(r);
    }

    public boolean checkX(Double x) {
        List<Double> ArrayX = Arrays.asList(-5.0, -4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0);
        return ArrayX.contains(x);
    }

    public boolean checkY(Double y) {
        return ((y <= 3) && (y >= -3));
    }

    public boolean checkR(Double r) {
        List<Double> ArrayR = Arrays.asList(1.0, 2.0, 3.0);
        return ArrayR.contains(r);
    }

    // Функция проверки попадания точки на график
    public boolean atArea(double x, double y, double r){
        return
            ((x <= 0) && (x >= -r) && (y >= 0) && (y <= r/2)) || // Проверка попадания в прямоугольник (см. график)
            ((x >= 0) && (y <= 0) && (x * x + y * y <= r * r)) || // Проверка попадания в четверть круга  (см. график)
            ((x >= 0) && (x <= r/2) && (y >= 0) && (y <= r ) && (y <= -2*x + r)); // Проверка попадания в треугольник (см. график)
    }
}