package net.socials.springboot.repository;

import net.socials.springboot.model.Social;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SocialsRepository extends JpaRepository<Social, Long> {
    Optional<Social> findByEmailId(String emailId);
}
