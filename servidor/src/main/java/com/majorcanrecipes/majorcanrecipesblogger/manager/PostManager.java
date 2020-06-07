/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.manager;

import com.majorcanrecipes.majorcanrecipesblogger.entity.Post;
import com.majorcanrecipes.majorcanrecipesblogger.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostManager {
    @Autowired
    PostRepository postRepository;
    //Crud -Basic operations
    public void save(Post post){
        postRepository.save(post);
    }
    public void delete(Post post){
        postRepository.delete(post);
    }
    public List<Post> getAll(){
        return (List<Post>)postRepository.findAll();
    }
    public Post getByIdPost(Integer id){
        return postRepository.findByIdPost(id);
    }
    public List<Post> getAllByTitleOrContent(String textToFind) {
        return postRepository.findAllByTitleContainsOrContentContains(textToFind,textToFind);
    }
}
