package net.socials.springboot.controller;

import net.socials.springboot.exception.ResourceNotFoundException;
import net.socials.springboot.model.Social;
import net.socials.springboot.repository.SocialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/socials")
public class SocialController {

    @Autowired
    private SocialsRepository socialsRepository;

    @GetMapping
    public List<Social> getAllSocials(){
        return socialsRepository.findAll();
    }

    @PostMapping
    public Social createSocial(@RequestBody Social social){
        return socialsRepository.save(social);
    }

//    TODO: @GetMapping("id/{id}")
    @GetMapping("{id}")
    public ResponseEntity<Social> getSocialById(@PathVariable long id){
        Social social = socialsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Social not exist with id: " + id));
        return ResponseEntity.ok(social);
    }

    @GetMapping("email/{emailId}")
    public ResponseEntity<Social> getSocialByEmailId(@PathVariable String emailId){
        Social social = socialsRepository.findByEmailId(emailId).orElseThrow(() -> new ResourceNotFoundException("Social not exist with email: " + emailId));
        return ResponseEntity.ok(social);
    }

    @PostMapping("login")
    public ResponseEntity<Social> loginAndReturnSocial(@RequestBody Social socialDetails) throws IllegalAccessException {
        Social social = socialsRepository.findByEmailId(socialDetails.getEmailId()).orElseThrow(() -> new ResourceNotFoundException("Social not exist with email: " + socialDetails.getEmailId()));

        if (socialDetails.getPassword().equals(social.getPassword())) {
            return ResponseEntity.ok(social);
        } else {
            throw new IllegalAccessException("Passwords do not match!");
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Social> updateSocial(@PathVariable long id, @RequestBody Social socialDetails){
        Social updateSocial = socialsRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Social not exists with id: " + id));

        updateSocial.setFirstName(socialDetails.getFirstName());
        updateSocial.setLastName(socialDetails.getLastName());
        updateSocial.setEmailId(socialDetails.getEmailId());
        updateSocial.setPassword(socialDetails.getPassword());
        socialsRepository.save(updateSocial);
        return ResponseEntity.ok(updateSocial);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteSocial(@PathVariable long id){
        Social social = socialsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Social not exist with id: " + id));
        socialsRepository.delete(social);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
