package net.socials.springboot.repository;

import net.socials.springboot.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostsRepository extends JpaRepository<Post, Long>{

}
