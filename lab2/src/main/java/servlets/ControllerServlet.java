package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        if (request.getParameter("reset") != null) {
            getServletContext().getRequestDispatcher("/reset.jsp").forward(request, response);
            return;
        };

        if (request.getParameter("back") != null) {
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
            return;
        };

        if (request.getParameterValues("x") == null) {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "x не задан");
            return;
        };
        if (request.getParameter("y") == null) {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "y не задан");
            return;
        };
        if (request.getParameter("r") == null) {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "r не задан");
            return;
        };    

        getServletContext().getRequestDispatcher("/AreaCheckServlet").forward(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //doPost(request, response);
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
    
}
