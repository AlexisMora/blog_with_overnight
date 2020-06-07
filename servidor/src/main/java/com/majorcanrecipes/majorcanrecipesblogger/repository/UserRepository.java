/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.repository;

import com.majorcanrecipes.majorcanrecipesblogger.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> getByEmailOrUserName(String s, String s2);
    User getByIdUser(Integer id);
}
