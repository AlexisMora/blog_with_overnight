/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.manager;

import com.majorcanrecipes.majorcanrecipesblogger.entity.User;
import com.majorcanrecipes.majorcanrecipesblogger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManager {
    @Autowired
    UserRepository userRepository;
    public User getById(Integer id){
       return userRepository.getByIdUser(id);
    }
    public List<User> getByEmailOrUserName(String s){
        return userRepository.getByEmailOrUserName(s,s);
    }
}
