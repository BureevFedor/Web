package controller;
import org.json.JSONException;
import org.json.JSONObject;

import beans.EntriesBean;
import beans.UsersBean;
import entities.UserEntity;
import validators.UserValidator;

import javax.ejb.EJB;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/authentication")
public class User {

    @EJB
    private UsersBean UsersBean;
    
    @EJB
    private EntriesBean EntriesBean;

    @POST
    @Path("/signup")
    public Response singUp(String requestBody) {
        Response.ResponseBuilder responseBuilder = Response.ok();
        responseBuilder.header("Content-Type", "application/json;charset=UTF-8");
        responseBuilder.status(200);
        try {
            JSONObject jsonObject = new JSONObject(requestBody);
            String username = jsonObject.getString("username");
            String password = jsonObject.getString("password");

            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(username);
            userEntity.setPassword(password);

            if (new UserValidator().validateSignUpData(username,password)) {
                if(!UsersBean.findUser(userEntity)) {
                    UsersBean.confusePassword(userEntity);
                    UsersBean.addUser(userEntity);
                    responseBuilder.entity(String.format("{\"authStatus\": \"%b\"}", true));
                    return responseBuilder.build();
                } else {
                    // Элемент уже есть в БД
                    responseBuilder.status(501);
                    responseBuilder.entity(String.format("{\"authStatus\": \"%b\"}", false));
                    return responseBuilder.build();
                }
            }
            // Данные не прошли валидацию
            responseBuilder.status(502);
            responseBuilder.entity(String.format("{\"authStatus\": \"%b\"}", false));
            return responseBuilder.build();
        } catch (JSONException e){;
            responseBuilder.status(503);
            responseBuilder.entity(String.format("{\"authStatus\": \"%b\"}" + e, false));
            return responseBuilder.build();
        }
    }

    @POST
    @Path("/login")
    public Response login(String requestBody) {
        Response.ResponseBuilder rb = Response.ok();
        rb.header("Content-Type", "application/json;charset=UTF-8");
        rb.status(200);

        try {
            JSONObject jsonObject = new JSONObject(requestBody);
            String username = jsonObject.getString("username");
            String password = jsonObject.getString("password");
            if (new UserValidator().validateLoginData(username,password)) {

                UserEntity userEntity = new UserEntity();
                userEntity.setUsername(username);
                userEntity.setPassword(password);
                
                if (UsersBean.login(userEntity)){
                    rb.entity(String.format("{\"authStatus\": \"%b\"}", true));
                    return rb.build();
                } else {
                    // Нет такого пользователя
                    rb.status(501);
                    rb.entity(String.format("{\"authStatus\": \"%b\"}", false));
                    return rb.build();
                }
            }
            rb.status(502);
            // Данные не прошли валидацию
            rb.entity(String.format("{\"authStatus\": \"%b\"}", false));
            return rb.build();
        } catch (JSONException e){
            rb.status(503);
            rb.entity(String.format("{\"authStatus\": \"%b\"}", false));
            return rb.build();
        }
    }

}
