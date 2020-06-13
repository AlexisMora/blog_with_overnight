/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.majorcanrecipes.majorcanrecipesblogger.entity.Post;
import com.majorcanrecipes.majorcanrecipesblogger.entity.User;
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
    public void updatepost(@RequestBody String request) {
        JsonObject jsonResponse = gson.fromJson(request,JsonObject.class);
        System.out.println(jsonResponse);
        Post post = postManager.getByIdPost(jsonResponse.get("idPost").getAsInt());
        post.setTitle(jsonResponse.get("title").toString().replace("\"",""));
        post.setContent(jsonResponse.get("content").toString().replace("\"",""));
        post.setLangOriginal(jsonResponse.get("lang_original").toString().replace("\"",""));
        post.setLangTranslate(jsonResponse.get("lang_translate").toString().replace("\"",""));
        List<User> userList = userManager.getByEmailOrUserName(jsonResponse.get("email").toString().replace("\"",""));
        post.setAuthor(userList.get(0));
        post.setDate(new Date());//Com que es editat, posam lora de la ultima edicio
        postManager.save(post);
    }

    @PostMapping("/postForm")
    public void createpost(@RequestBody String request) {
        JsonObject jsonResponse = gson.fromJson(request,JsonObject.class);
        System.out.println(jsonResponse);
        Post post = new Post();
        post.setTitle(jsonResponse.get("title").toString().replace("\"",""));
        post.setContent(jsonResponse.get("content").toString().replace("\"",""));
        post.setLangOriginal(jsonResponse.get("lang_original").toString().replace("\"",""));
        post.setLangTranslate(jsonResponse.get("lang_translate").toString().replace("\"",""));
        List<User> userList = userManager.getByEmailOrUserName(jsonResponse.get("email").toString().replace("\"",""));
        post.setAuthor(userList.get(0));
        post.setDate(new Date());//Com que es editat, posam lora de la ultima edicio
        postManager.save(post);


    }

    @GetMapping("/deletepost")
    public void deletePost(@RequestParam String id) {
        postManager.delete(postManager.getByIdPost(Integer.parseInt(id)));
    }
}
