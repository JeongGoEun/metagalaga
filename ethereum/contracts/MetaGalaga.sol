pragma solidity ^0.4.25;

import "./Ownable.sol";

contract MetaGalaga is Ownable {
    
    event RegisterScore(string _userName, uint _userScore);
    
    struct User {
        address userMetaId; 
        string userName;    
        uint userScore;
        uint timestamp;
    }
    
    mapping (uint => User) public rankMap;
    
    uint public minScore;
    uint public minIndex;
    
    constructor() public {
        minScore = 0;
        minIndex = 1;
    }
    
    function registerScore(string _userName, uint _userScore) public {
        // Verify if user's score is higher than minimum score or not
        require(minScore < _userScore);
        
        // Declare a structure for user’s info
        User memory user;
        user.userMetaId = msg.sender;
        user.userName = _userName;
        user.userScore = _userScore;
        user.timestamp = block.timestamp;
        
        // Update TOP10 scores.
        rankMap[minIndex] = user;

        // Update minimum score and index
        minIndex = 1;
        minScore = rankMap[minIndex].userScore; 
        for(uint i=2; i<=10; i++) {
            if(rankMap[i].userScore == 0) {
                minIndex = i;
                minScore = 0;
                break;
            }
            else {
                if(rankMap[i].userScore < minScore) {
                    minIndex = i;
                    minScore = rankMap[i].userScore;
                }
            }
        }
        
        RegisterScore(_userName, _userScore);
    }
    
    function clearScore() public onlyOwner {
        for(uint i=1; i<=10; i++) {
            delete rankMap[i];
        }
        minScore = 0;
        minIndex = 1;
    }
}