package controller;
import org.jboss.resteasy.plugins.interceptors.CorsFilter;
import org.json.JSONException;
import org.json.JSONObject;

import beans.EntriesBean;
import beans.UsersBean;
import entities.EntryEntity;
import entities.UserEntity;
import validators.EntryValidator;
import validators.UserValidator;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;

@Path("/entries")
public class Entry {

    @EJB
    private UsersBean UsersBean;

    @EJB
    private EntriesBean EntriesBean;

    @POST
    @Path("/add")
    public Response add(String requestBody) {
        Response.ResponseBuilder responseBuilder = Response.ok();
        responseBuilder.header("Content-Type", "application/json;charset=UTF-8");
        responseBuilder.status(200);

        try {
            JSONObject jsonObject = new JSONObject(requestBody);
            double x = jsonObject.getDouble("coordinateX");
            double y = jsonObject.getDouble("coordinateY");
            double r = jsonObject.getDouble("radius");
            String username = jsonObject.getString("username");
            String password = jsonObject.getString("password");

            EntryEntity entryEntity = new EntryEntity();
            entryEntity.setX(x);
            entryEntity.setY(y);
            entryEntity.setR(r);
            entryEntity.setUsername(username);
            entryEntity.setIsHit(new EntryValidator().atArea(x,y,r));
            entryEntity.setAttemptTime(LocalDateTime.now());

            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(username);
            userEntity.setPassword(password);

            EntriesBean.addEntry(entryEntity);

            List entries = EntriesBean.getEntries(userEntity);

            String strdots = String.format("{\"updateStatus\": \"%b\", \"dots\": [",true);
            for (Object o : entries){
                EntryEntity dot = (EntryEntity) o;
                strdots +=String.format( "{" +
                        "\"coordinateX\": \"%f\", " +
                        "\"coordinateY\": \"%f\", " +
                        "\"radius\": \"%f\", " +
                        "\"result\": \"%s\", " +
                        "\"currentTime\": \"%s\"" + 
                        "}",dot.getX(),dot.getY(),dot.getR(),dot.getResult(),dot.getAttemptTime());
                if (o != entries.get(entries.size()-1)){
                    strdots+=",";
                }
            }
            strdots +="]}";

            responseBuilder.entity(strdots);
            return responseBuilder.build();
        } catch (JSONException e){
            responseBuilder.status(503);
            responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}" + e, false));
            return responseBuilder.build();
        }
    }

    @POST
    @Path("/clear")
    public Response clear(String requestBody) {
        Response.ResponseBuilder responseBuilder = Response.ok();
        responseBuilder.header("Content-Type", "application/json;charset=UTF-8");
        responseBuilder.status(200);
        try {
            JSONObject jsonObject = new JSONObject(requestBody);
            String  username = jsonObject.getString("username");
            String password = jsonObject.getString("password");

            if (new UserValidator().validateLoginData(username,password)) {

                UserEntity userEntity = new UserEntity();
                userEntity.setUsername(username);
                userEntity.setPassword(password);

                if(UsersBean.findUser(userEntity)) {
                    EntriesBean.clear(userEntity);
                    responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"} ", true));
                    return responseBuilder.build();
                } else {
                    // Пользователь не найден
                    responseBuilder.status(501);
                    responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}", false));
                    return responseBuilder.build();
                }
            }
            // Данные не прошли валидацию
            responseBuilder.status(502);
            responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}", false));
            return responseBuilder.build();
        } catch (JSONException e){
            responseBuilder.status(503);
            responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}", false));
            return responseBuilder.build();
        }
    }

    @POST
    @Path("/observe")
    public Response observe(String requestBody) {

        Response.ResponseBuilder responseBuilder = Response.ok();
        responseBuilder.header("Content-Type", "application/json;charset=UTF-8");
        responseBuilder.status(200);

        try {
            JSONObject jsonObject = new JSONObject(requestBody);
            String username = jsonObject.getString("username");
            String password = jsonObject.getString("password");

            if (new UserValidator().validateLoginData(username,password)) {
                UserEntity userEntity = new UserEntity();
                userEntity.setUsername(username);
                userEntity.setPassword(password);

                if (UsersBean.login(userEntity)) {
                    List dots = EntriesBean.getEntries(userEntity);
                    String strdots = String.format("{\"updateStatus\": \"%b\", \"dots\": [",true);
                    for (Object o : dots){
                        EntryEntity dot = (EntryEntity) o;
                        strdots +=String.format( "{" +
                                "\"coordinateX\": \"%f\", " +
                                "\"coordinateY\": \"%f\", " +
                                "\"radius\": \"%f\", " +
                                "\"result\": \"%s\", " +
                                "\"currentTime\": \"%s\"" +
                                "}",dot.getX(),dot.getY(),dot.getR(),dot.getResult(),dot.getAttemptTime());
                        if (o != dots.get(dots.size()-1)){
                            strdots+=",";
                        }
                    }
                    strdots +="]}";
                    responseBuilder.entity(strdots);
                    return responseBuilder.build();
                } else {
                    // Пользователь не найден
                    responseBuilder.status(501);
                    responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}", false));
                    return responseBuilder.build();
                }
            }
            // Данные не прошли валидацию
            responseBuilder.status(502);
            responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}", false));
            return responseBuilder.build();
        } catch (JSONException e){
            responseBuilder.status(503);
            responseBuilder.entity(String.format("{\"updateStatus\": \"%b\"}", false));
            return responseBuilder.build();
        }
    }

}
