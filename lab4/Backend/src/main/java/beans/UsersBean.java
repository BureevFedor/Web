package beans;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;

import entities.EntryEntity;
import entities.UserEntity;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.security.MessageDigest;

@Stateless
public class UsersBean {

    @PersistenceContext(unitName = "lab4UsersPU")

    private EntityManager entityManager;

    // Добавить пользователя
    public void addUser(UserEntity user) {
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.persist(user);
            transaction.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            transaction.rollback();
        }
    }

    // Проверить есть ли такой пользователь
    public boolean findUser(UserEntity user){
        List l = entityManager
                .createQuery("SELECT u FROM UserEntity u WHERE u.username LIKE :name", UserEntity.class)
                .setParameter("name", user.getUsername())
                .getResultList();
        return !l.isEmpty();
    }

    // Проверить, правильные ли логин и пароль
    public boolean login(UserEntity user){
        confusePassword(user);
        List l = entityManager
                .createQuery("SELECT u FROM UserEntity u WHERE u.username LIKE :name AND u.password LIKE :pas", UserEntity.class)
                .setParameter("name", user.getUsername())
                .setParameter("pas", user.getPassword())
                .getResultList();
        return !l.isEmpty();
    }

    public void confusePassword (UserEntity user){
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            
            String purePassword = user.getPassword();
            String salt = user.getUsername();
            String pepper = "#$EV#$407";
            byte[] hash = md.digest( (pepper+purePassword+salt).getBytes(StandardCharsets.UTF_8) );
            StringBuilder stringBuilder = new StringBuilder();
            for (byte b : hash) {
                stringBuilder.append(String.format("%02X",b));
            }
            
            user.setPassword(stringBuilder.toString());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}