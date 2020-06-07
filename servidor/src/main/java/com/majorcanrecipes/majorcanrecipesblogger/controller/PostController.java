/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.controller;

import com.google.gson.Gson;
import com.majorcanrecipes.majorcanrecipesblogger.entity.Post;
import com.majorcanrecipes.majorcanrecipesblogger.manager.PostManager;
import com.majorcanrecipes.majorcanrecipesblogger.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostManager postManager;
    @Autowired
    UserManager userManager;

    @Autowired
    Gson gson;

    @GetMapping("/")
    public List<Post> getAllPosts() {
        List<Post> posts = postManager.getAll();
        return posts;
    }

    @GetMapping("/getPost")
    public Post getPostById(@RequestParam String id) {
        return postManager.getByIdPost(Integer.parseInt(id));
    }

    @PutMapping("/postForm")
    public void updatepost(
            @RequestParam String idPost,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String lang_original,
            @RequestParam String lang_translate,
            @RequestParam String id_user) {
        Post post = postManager.getByIdPost(Integer.parseInt(idPost));
        post.setTitle(title);
        post.setContent(content);
        post.setLangOriginal(lang_original);
        post.setLangTranslate(lang_translate);
        post.setAuthor(userManager.getById(Integer.parseInt(id_user)));
        post.setDate(new Date());//Com que es editat, posam lora de la ultima edicio
        postManager.save(post);
    }

    @PostMapping("/postForm")
    public void createpost(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String lang_original,
            @RequestParam String lang_translate,
            @RequestParam String id_user) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setLangOriginal(lang_original);
        post.setLangTranslate(lang_translate);
        post.setAuthor(userManager.getById(Integer.parseInt(id_user)));
        post.setDate(new Date());
        postManager.save(post);


    }

    @DeleteMapping("/postForm")
    public void deletePost(@RequestParam String id) {
        postManager.delete(postManager.getByIdPost(Integer.parseInt(id)));
    }
}
