pragma solidity ^0.4.24;

contract MetaGalaga {
    struct User {
        address userMetaId; //Meta address
        string userName;    
        uint userScore;  //MetaGalaga score
    }
    
    mapping (uint => User) public rankMap;
    
    uint public minScore;
    uint public minIndex;    //start index 1
    
    constructor() public {
        minScore = 0;
        minIndex = 1;
    }
    
    function registerScore(string _userName, uint _userScore) public {
        require(minScore < _userScore); //new user score higher than minimum score
        
        User memory user;  //definition value
        user.userMetaId = msg.sender;
        user.userName = _userName;
        user.userScore = _userScore;
        
        rankMap[minIndex] = user;
        
        minIndex = 1;
        minScore = rankMap[minIndex].userScore; //Start at index 1
        
        for(uint i=2; i<=10; i++) {    //set value minimum index, score
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
    }
}