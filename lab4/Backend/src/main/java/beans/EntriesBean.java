package beans;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;

import entities.EntryEntity;
import entities.UserEntity;


@Stateless
public class EntriesBean {

    @PersistenceContext(unitName = "lab4EntriesPU")

    private EntityManager entityManager;

    // Добавить точку
    public void addEntry(EntryEntity entry) {
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.persist(entry);
            transaction.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            transaction.rollback();
        }
    }

    // Получить лист точек определённого пользователя
    public List getEntries(UserEntity user){
        EntityTransaction transaction = entityManager.getTransaction();
        List list = new ArrayList();

        try {
            transaction.begin();
            list = entityManager.createQuery("select e from EntryEntity e WHERE e.username LIKE :name", EntryEntity.class)
                .setParameter("name", user.getUsername())
                .getResultList();
            transaction.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            transaction.rollback();
        }

        return list;
    }

    // Удалить все точки определённого пользователя
    public void clear(UserEntity user) {
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            List l =  entityManager.createQuery("SELECT e FROM EntryEntity e WHERE e.username LIKE :name")
                .setParameter("name", user.getUsername())
                .getResultList();
            for (Object o : l) {
                entityManager.remove(o);
            }
            transaction.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            transaction.rollback();
        }
    }
}