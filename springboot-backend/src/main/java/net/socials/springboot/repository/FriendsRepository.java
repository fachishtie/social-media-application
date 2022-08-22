package net.socials.springboot.repository;

import net.socials.springboot.model.Friends;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FriendsRepository extends JpaRepository<Friends, Long>{
    Optional<Friends> findByUserId(long userId);
}
