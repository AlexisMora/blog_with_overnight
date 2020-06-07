/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.repository;

import com.majorcanrecipes.majorcanrecipesblogger.entity.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer> {
    List<Post> findAllByTitleContainsOrContentContains(String textToFind, String textToFind2);

    Post findByIdPost(Integer id);

    List<Post> findAllByDateBefore(Date date);

    List<Post> findAllByDateAfter(Date date);

    List<Post> findAllByDateBetween(Date dateBefore, Date dateAfter);
}
