// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import an external library for generating UUIDs
import "@openzeppelin/contracts/utils/Strings.sol";

contract Election {
    // onChain Voter
    event addChainVoterEvent(bool status);
    mapping(address => bool) public chainVoter;
    mapping(uint => bool) public chainVoterId;
    mapping(address => bool) public canVote;

    address[] public voters;

    function fetchVoters() external view returns (address[] memory) {
        uint numVoters = voters.length;

        // Return an empty array if there are no candidates
        if (numVoters == 0) {
            return new address[](0);
        }

        address[] memory votersArray = new address[](numVoters);

        for (uint i = 0; i < numVoters; i++) {
            votersArray[i] = voters[i];
        }
        return votersArray;
    }

    function addChainVoter(uint id) public returns (bool) {
        chainVoter[msg.sender] = true;
        chainVoterId[id] = true;
        voters.push(msg.sender);
        canVote[msg.sender] = true;
        emit addChainVoterEvent(true);
        return true;
    }

    // Voting
    event Voted(bool status, uint candidateIndex);

    mapping(address => DetailVote) public detailVote;
    struct DetailVote {
        uint timestamp;
        uint candidate;
    }

    function vote(uint candidateIndex) public voteActive {
        require(chainVoter[msg.sender], "Only registered voters can vote");
        require(
            canVote[msg.sender],
            "Anda sudah melakukan pemilihan sebelumnya"
        );
        require(candidateIndex < candidates.length, "Invalid candidate index");
        candidates[candidateIndex].voteCount++;

        detailVote[msg.sender] = DetailVote(block.timestamp, candidateIndex);
        canVote[msg.sender] = false;
        emit Voted(true, candidateIndex);
    }

    // Candidate
    Candidate[] public candidates;
    struct Candidate {
        string name;
        string image;
        uint256 voteCount;
    }

    bool public electionActive;

    mapping(string => bool) public voted;
    mapping(string => uint) public voteTimestamp;
    mapping(address => bool) public isAdmin;
    address[] public adminAddresses;

    struct Voter {
        bool isRegistered;
        bool isVerified;
        string id;
        string name;
        string idCard;
        address account;
    }

    struct uuidToId {
        string idcard;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Unauthorized: Caller is not an admin");
        _;
    }

    modifier voteActive() {
        require(electionActive, "Unauthorized: Vote is Off");
        _;
    }

    constructor() {
        electionActive = false;
        isAdmin[msg.sender] = true;
        adminAddresses.push(msg.sender);
    }

    function toggleElection() public onlyAdmin returns (bool) {
        electionActive = !electionActive;
        return true;
    }

    event VoterRegistered(
        address indexed electionAccount,
        string name,
        string idCard,
        string uuid
    );

    // Candidate Component
    function addCandidate(
        string memory _name,
        string memory _image
    ) public onlyAdmin {
        candidates.push(Candidate({name: _name, image: _image, voteCount: 0}));
    }

    function fetchCandidates() external view returns (Candidate[] memory) {
        uint numCandidates = candidates.length;

        // Return an empty array if there are no candidates
        if (numCandidates == 0) {
            return new Candidate[](0);
        }

        Candidate[] memory candidatesArray = new Candidate[](numCandidates);

        for (uint i = 0; i < numCandidates; i++) {
            candidatesArray[i] = candidates[i];
        }
        return candidatesArray;
    }

    function deleteCandidate(uint candidateIndex) public onlyAdmin {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        candidates[candidateIndex] = candidates[candidates.length - 1];
        candidates.pop();
        // Emit an event or perform any other necessary actions
        emit CandidateDeleted(candidateIndex);
    }

    event CandidateDeleted(uint indexed candidateIndex);

    function updateCandidate(
        uint candidateIndex,
        string memory _newName,
        string memory _newImage
    ) public onlyAdmin {
        require(candidateIndex < candidates.length, "Invalid candidate index");

        // You can add additional conditions or permissions if needed

        Candidate storage candidate = candidates[candidateIndex];
        candidate.name = _newName;
        candidate.image = _newImage;

        // Emit an event or perform any other necessary actions
        emit CandidateUpdated(msg.sender, candidateIndex, _newName, _newImage);
    }

    event CandidateUpdated(
        address indexed updater,
        uint indexed candidateIndex,
        string newName,
        string newImage
    );
}
