package utils;

import model.Entry;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.enterprise.inject.Default;

@Default
public class DBManager implements Serializable {
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("examplePU");
    EntityManager entityManager = entityManagerFactory.createEntityManager();

    String errMsg = "";

    public boolean addEntry(Entry entry){
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            entityManager.persist(entry);
            transaction.commit();
            return true;
        }catch (Exception e){
            errMsg = e.getMessage();
            transaction.rollback();
            return false;
        }
    }

    public boolean clear() {
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            entityManager.createQuery("delete from Entry").executeUpdate();
            transaction.commit();
            return true;
        } catch (Exception e) {
            errMsg = e.getMessage();
            transaction.rollback();
            return false;
        }
    }

    public ArrayList<Entry> getEntries(){
        try {
            List entryList = entityManager.createQuery("select e from Entry e", Entry.class).getResultList();
            return new ArrayList<Entry>(entryList);
        }catch (Exception e){
            errMsg = e.getMessage();
            return new ArrayList<Entry>();
        }
    }

    public String getErrMsg() {
        return errMsg;
    }
}