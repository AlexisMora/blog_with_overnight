/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_post")
    private Integer idPost;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "lang_original")
    private String langOriginal;

    @Column(name = "lang_Translate")
    private String langTranslate;

    @ManyToOne
    @JoinColumn(name = "idUser")
    @JsonManagedReference
    private User author;

    @Column(name = "date", columnDefinition = "DATETIME")
    private Date date;

    public Post() {

    }

    public Integer getIdPost() {
        return idPost;
    }

    public void setIdPost(Integer idPost) {
        this.idPost = idPost;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLangOriginal() {
        return langOriginal;
    }

    public void setLangOriginal(String langOriginal) {
        this.langOriginal = langOriginal;
    }

    public String getLangTranslate() {
        return langTranslate;
    }

    public void setLangTranslate(String langTranslate) {
        this.langTranslate = langTranslate;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
