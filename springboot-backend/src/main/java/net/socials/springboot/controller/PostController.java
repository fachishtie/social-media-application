package net.socials.springboot.controller;

import net.socials.springboot.exception.ResourceNotFoundException;
import net.socials.springboot.model.Post;
import net.socials.springboot.model.PostWithName;
import net.socials.springboot.model.Social;
import net.socials.springboot.repository.PostsRepository;
import net.socials.springboot.repository.SocialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private SocialsRepository socialsRepository;

    @GetMapping
    public List<PostWithName> getAllPostsWithNames() {
        List<Post> posts = postsRepository.findAll();
        List<PostWithName> postsWithNames = new ArrayList<>();

        for (Post post : posts) {
            long posterId = post.getPosterId();
            Social social = socialsRepository.findById(posterId).orElseThrow(() -> new ResourceNotFoundException("Social not exist with id: " + posterId));
            String fullName = social.getFirstName() + " " + social.getLastName();
            PostWithName postWithName = new PostWithName();
            postWithName.setPost(post);
            postWithName.setFullName(fullName);
            postsWithNames.add(postWithName);
        }

        return postsWithNames;
    }

    @PostMapping
    public Post createPosts(@RequestBody Post post){
        return postsRepository.save(post);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable long id){
        Post post = postsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + id));
        postsRepository.delete(post);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{id}")
    public ResponseEntity<PostWithName> getPostAndPosterNameById(@PathVariable long id){
        Post post = postsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post not exist with id: " + id));
        long posterId = post.getPosterId();
        Social social = socialsRepository.findById(posterId).orElseThrow(() -> new ResourceNotFoundException("Social not exist with id: " + posterId));
        String fullName = social.getFirstName() + " " + social.getLastName();
        PostWithName postWithName = new PostWithName();
        postWithName.setPost(post);
        postWithName.setFullName(fullName);
        return ResponseEntity.ok(postWithName);
    }
}
