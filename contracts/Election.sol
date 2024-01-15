// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    address public owner;
    uint public electionEndTime;

    struct Candidate {
        string name;
        string image;
        uint voteCount;
    }

    struct Voter {
        bool isRegistered;
        bool isVerified;
        string name; 
        string idCard;
        address account;
    }

    // Dictionary of voters (address: Voter)
    address[] registeredAddress;
    mapping(address => Voter) public voters;
    mapping(address => bool) public voted;
    mapping(address => uint) public voteTimestamp;
    mapping(address => bool) public isAdmin;

    Candidate[] public candidates;

    event VoterRegistered(address indexed voter, string name, string idCard);
    event VoterVerified(address indexed voter);
    event Voted(address indexed voter, uint indexed candidateIndex);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAdmin(){
        require(isAdmin[msg.sender],"Only admin can access this");
        _;
    }

    modifier onlyBeforeElectionEnd() {
        require(block.timestamp < electionEndTime, "Election has ended");
        _;
    }

    modifier onlyAfterElectionEnd() {
        require(block.timestamp >= electionEndTime, "Election is still ongoing");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        _;
    }

    modifier onlyVerifiedVoter() {
        require(voters[msg.sender].isVerified, "Voter is not verified");
        _;
    }

    constructor(uint _durationInMinutes) {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
        electionEndTime = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    function addCandidate(string memory _name, string memory _image) public onlyOwner onlyAdmin onlyBeforeElectionEnd {
        candidates.push(Candidate({
            name: _name,
            image: _image,
            voteCount: 0
        }));
    }

    function registerVoter(string memory _name, string memory _idCard) public onlyBeforeElectionEnd {
        require(!voters[msg.sender].isRegistered, "Voter is already registered");
        voters[msg.sender].name = _name;
        voters[msg.sender].idCard = _idCard;
        voters[msg.sender].account = msg.sender;
        voters[msg.sender].isRegistered = true;
        registeredAddress.push(msg.sender);
        emit VoterRegistered(msg.sender, _name, _idCard);
    }

    function verifyVoter(address _voterAddress) public onlyOwner onlyAdmin onlyBeforeElectionEnd {
        require(voters[_voterAddress].isRegistered, "Voter is not registered");
        require(!voters[_voterAddress].isVerified, "Voter is already verified");
        voters[_voterAddress].isVerified = true;
        emit VoterVerified(_voterAddress);
    }

    function getAllVoters() public view onlyOwner onlyAdmin returns (Voter[] memory) {
        uint256 totalRegistered = registeredAddress.length;
        Voter[] memory allVoters = new Voter[](totalRegistered);
        for (uint256 i=0; i < totalRegistered; i++){
            address _address = registeredAddress[i];
            allVoters[i] = voters[_address];
        }
        return allVoters;

    }


    function vote(uint _candidateIndex) public onlyRegisteredVoter onlyVerifiedVoter onlyBeforeElectionEnd {
        require(!voted[msg.sender], "You have already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        voted[msg.sender] = true;
        voteTimestamp[msg.sender] = block.timestamp;
        candidates[_candidateIndex].voteCount++;

        emit Voted(msg.sender, _candidateIndex);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getAllVotes() public view returns (uint[] memory) {
        uint[] memory votes = new uint[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            votes[i] = candidates[i].voteCount;
        }
        return votes;
    }

    function getStatusVote() public view returns (bool hasVoted, uint voteTimestamp_) {
        return (voted[msg.sender], voteTimestamp[msg.sender]);
    }

    function getRemainingTime() public view returns (uint remainingTime) {
        if (block.timestamp < electionEndTime) {
            remainingTime = electionEndTime - block.timestamp;
        }
    }
}
