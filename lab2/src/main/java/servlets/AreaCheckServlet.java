package servlets;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import models.Entry;

@WebServlet(urlPatterns="/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String[] x = request.getParameterValues("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        double[] X = new double[x.length];
        double Y;
        double R;

        try {
            for(int i = 0; i < x.length; i++) {
                X[i] = Double.parseDouble(x[i]);
            }
            Y = Double.parseDouble(y);
            R = Double.parseDouble(r);
        }
        catch (Exception e) {
            response.setStatus(400);
            response.getWriter().print("x, y, и r должны быть double ");
            return;
        }

        HttpSession session = request.getSession(true);
        if (session.getAttribute("tableData") == null) {
            session.setAttribute("tableData", "");
        }

        if (session.getAttribute("Entries") == null) {
            session.setAttribute("Entries", new ArrayList<Entry>());
        }

        session.setAttribute("LastX", "");
        session.setAttribute("LastY", y);
        session.setAttribute("LastR", r);
        session.setAttribute("LastEntries", "");
        session.setAttribute("LastTableData", "");
 
        for(int i = 0; i < X.length; i++) {
            if (!checkDataValid(X[i], Y, R)) {
                response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "x, y или r - не попадают в интервалы");
                return;
            }

            LocalDateTime attemptTime = LocalDateTime.now();
            long scriptStartTime = System.nanoTime();
            boolean isHit = atArea(X[i], Y, R);
            long scriptEndTime = System.nanoTime();
            long scriptDuration = (scriptEndTime - scriptStartTime);

            String row = 
                "<tr>" +
                    "<td><p>" + X[i] + "</p></td>" +
                    "<td><p>" + Y + "</p></td>" +
                    "<td><p>" + R + "</p></td>" +
                    "<td><p>" + attemptTime + "</p></td>" +
                    "<td><p>" + scriptDuration + "ms </p></td>" +
                    (isHit ? "<td style='color: green'><b>HIT</b></td>" : "<td style='color: red'>miss</td>") + 
                "</tr>";

            response.getWriter().print(row);

            session.setAttribute("tableData", session.getAttribute("tableData") + row);

            Entry entry = new Entry(X[i], Y, R, isHit);
            ArrayList<Entry> entries = (ArrayList<Entry>)session.getAttribute("Entries");
            entries.add(entry);
            session.setAttribute("Entries", entries);

            session.setAttribute("LastX", session.getAttribute("LastX") + " " + x[i]);
            session.setAttribute("LastTableData", session.getAttribute("LastTableData") + row);
            session.setAttribute("LastEntries", session.getAttribute("LastEntries") + " " + X[i] + "," + Y);
        }

        response.sendRedirect("result.jsp");
    }

    // Функция проверки валидности значений
    private boolean checkDataValid(double x, double y, double r){
        return checkX(x) && checkY(y) && checkR(r);
    }

    private boolean checkX(Double x) {
        List<Double> ArrayX = Arrays.asList(-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0);
        //return ArrayX.contains(x);
        return true;
    }

    private boolean checkY(Double y) {
        //return (y >= -5) && (y <= 5);
        return true;
    }

    private boolean checkR(Double r) {
        List<Double> ArrayX = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);
        return ArrayX.contains(r);
    }

    // Функция проверки попадания точки на график
    private boolean atArea(double x, double y, double r){
        return
            ((x <= 0) && (x >= -r/2) && (y >= 0) && (y <= r)) || // Проверка попадания в прямоугольник (см. график)
            ((x >= 0) && (y >= 0) && (x * x + y * y <= r * r)) || // Проверка попадания в четверть круга  (см. график)
            ((x >= 0) && (x <= r / 2) && (y <= 0) && (y >= -r/2 ) && (y >=  x - r/2)); // Проверка попадания в треугольник (см. график)
    }
}