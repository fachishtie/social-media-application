package net.socials.springboot.controller;

import net.socials.springboot.exception.ResourceNotFoundException;
import net.socials.springboot.model.*;
import net.socials.springboot.repository.FriendsRepository;
import net.socials.springboot.model.FriendsWithName;
import net.socials.springboot.model.Social;
import net.socials.springboot.model.Friends;
import net.socials.springboot.repository.SocialsRepository;
import net.socials.springboot.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/friends")

public class FriendsController {

    @Autowired
    private FriendsRepository friendsRepository;
    @Autowired
    private SocialsRepository socialsRepository;

    @GetMapping
    public List<Friends> getAllFriends(){
        return friendsRepository.findAll();
    }

    @GetMapping("all")
    public List<FriendsWithName> getAllFriendsWithNames() {
        List<Friends> friends = friendsRepository.findAll();
        List<FriendsWithName> friendsWithNames = new ArrayList<>();

        for (Friends friendly : friends) {
            long friendId = friendly.getFriendId();
            Social social = socialsRepository.findById(friendId).orElseThrow(() -> new ResourceNotFoundException("Social not exist with id: " + friendId));
            String fullName = social.getFirstName() + " " + social.getLastName();
            FriendsWithName friendsWithName = new FriendsWithName();
            friendsWithName.setFriends(friendly);
            friendsWithName.setFullName(fullName);
            friendsWithNames.add(friendsWithName);
        }

        return friendsWithNames;
    }

    @PostMapping
    public Friends createFriends(@RequestBody Friends friends){
        return friendsRepository.save(friends);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteFriends(@PathVariable long id){
        Friends friends = friendsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Friend does not exist with id: " + id));
        friendsRepository.delete(friends);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<HttpStatus> deleteBothFriends(@PathVariable long id){
        List<Friends> friendsAll = friendsRepository.findAll();
        Friends friends = friendsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Friend does not exist with id: " + id));
        for(Friends friendly: friendsAll)
        {
            if(friendly.getFriendId() == friends.getUserId() && friendly.getUserId() == friends.getFriendId())
            {
                friendsRepository.delete(friendly);
            }
        }
        friendsRepository.delete(friends);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{userId}")
    public List<Friends> getFriendsByUserId(@PathVariable long userId){
        List<Friends> friends= friendsRepository.findAll();
        List<Friends> friendsList = new ArrayList<>();

        for (Friends friend : friends)
        {
            long idUser = friend.getUserId();
            if(idUser == userId)
            {
                friendsList.add(friend);
            }
        }
        return friendsList;
    }

    @GetMapping("userId/{userId}")
    public List<FriendsWithName> getFriendsAndFriendNameByUserId(@PathVariable long userId){
        List<Friends> friends = friendsRepository.findAll();
        List<FriendsWithName> friendsWithNames = new ArrayList<>();

        for (Friends friendly : friends) {
            if(friendly.getUserId() == userId)
            {
                long friendId = friendly.getFriendId();
                Social social = socialsRepository.findById(friendId).orElseThrow(() -> new ResourceNotFoundException("Social not exist with id: " + friendId));
                String fullName = social.getFirstName() + " " + social.getLastName();
                FriendsWithName friendsWithName = new FriendsWithName();
                friendsWithName.setFriends(friendly);
                friendsWithName.setFullName(fullName);
                friendsWithNames.add(friendsWithName);
            }
        }

        return friendsWithNames;
    }
}
