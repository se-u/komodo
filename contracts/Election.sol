// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import an external library for generating UUIDs
import "@openzeppelin/contracts/utils/Strings.sol";

contract Election {
    bool public isVoteActive;
    string[] registeredIdCard;
    mapping(string => Voter) public voters;
    mapping(string => uuidToId) public getIdCard;
    mapping(string => bool) public voted;
    mapping(string => uint) public voteTimestamp;
    mapping(address => string) public stations;
    mapping(address => bool) public isAdmin;
    address[] public adminAddresses;
    Candidate[] public candidates;

    struct Candidate {
        string name;
        string image;
        uint256 voteCount;
    }

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
        require(isVoteActive, "Unauthorized: Vote is Off");
        _;
    }

    constructor() {
        stations[msg.sender] = "default name";
        isVoteActive = false;
        isAdmin[msg.sender] = true;
        adminAddresses.push(msg.sender);
    }

    function addAdmin(address _adminAddress) public onlyAdmin returns (bool) {
        require(!isAdmin[_adminAddress], "Admin already exists");
        isAdmin[_adminAddress] = true;
        adminAddresses.push(_adminAddress);
        return true;
    }

    function deleteAdmin(
        address _adminAddress
    ) public onlyAdmin returns (bool) {
        require(isAdmin[_adminAddress], "Admin not found");
        isAdmin[_adminAddress] = false;

        // Remove the admin from the array
        uint indexToDelete;
        for (uint i = 0; i < adminAddresses.length; i++) {
            if (adminAddresses[i] == _adminAddress) {
                indexToDelete = i;
                break;
            }
        }
        if (indexToDelete < adminAddresses.length - 1) {
            adminAddresses[indexToDelete] = adminAddresses[
                adminAddresses.length - 1
            ];
        }
        adminAddresses.pop();

        return true;
    }

    function fetchAllAdmin() public view onlyAdmin returns (address[] memory) {
        return adminAddresses;
    }

    function fetchStation() public view returns (string memory) {
        return stations[msg.sender];
    }

    function updateStation(string memory name) public onlyAdmin returns (bool) {
        stations[msg.sender] = name;
        return true;
    }

    function updateVoteActive() public onlyAdmin returns (bool) {
        isVoteActive = !isVoteActive;
        return true;
    }

    event VoterRegistered(
        address indexed electionAccount,
        string name,
        string idCard,
        string uuid
    );

    function bytes32ToString(
        bytes32 _bytes32
    ) public pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function addVoter(
        string memory _name,
        string memory _idCard
    ) public onlyAdmin returns (string memory) {
        require(!voters[_idCard].isRegistered, "Voter is already registered");

        string memory uuid = generateUUID();
        voters[_idCard].id = uuid;
        voters[_idCard].name = _name;
        voters[_idCard].idCard = _idCard;
        voters[_idCard].account = msg.sender;
        voters[_idCard].isRegistered = true;
        getIdCard[uuid].idcard = _idCard;
        registeredIdCard.push(_idCard);
        emit VoterRegistered(msg.sender, _name, _idCard, uuid);
        return uuid;
    }

    function fetchVoters() external view onlyAdmin returns (string[][] memory) {
        uint numVoters = registeredIdCard.length;
        if (numVoters == 0) {
            // Return an empty array if there are no registered voters
            return new string[][](0);
        }
        string[][] memory votersArray = new string[][](numVoters);

        for (uint i = 0; i < numVoters; i++) {
            string memory voterIdCard = registeredIdCard[i];
            votersArray[i] = new string[](5);
            votersArray[i][0] = voters[voterIdCard].id;
            votersArray[i][1] = voters[voterIdCard].name;
            votersArray[i][2] = voters[voterIdCard].idCard;
            votersArray[i][3] = voters[voterIdCard].isVerified
                ? "Verified"
                : "Not Verified";
            votersArray[i][4] = voters[voterIdCard].isRegistered
                ? "Registered"
                : "Not Registered";
        }

        return votersArray;
    }

    function getVoterById(
        string memory voterId
    ) external view returns (Voter memory) {
        string memory _idCard = getIdCard[voterId].idcard;
        // require(voters[_idCard].isRegistered, "Voter not found");
        return voters[_idCard];
    }

    function deleteVoterById(string memory voterId) public onlyAdmin {
        string memory _idCard = getIdCard[voterId].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");

        // Find the index of the voter in the registeredIdCard array
        uint indexToDelete;
        for (uint i = 0; i < registeredIdCard.length; i++) {
            if (
                keccak256(bytes(registeredIdCard[i])) ==
                keccak256(bytes(_idCard))
            ) {
                indexToDelete = i;
                break;
            }
        }

        // Remove the voter from the array
        if (indexToDelete < registeredIdCard.length - 1) {
            registeredIdCard[indexToDelete] = registeredIdCard[
                registeredIdCard.length - 1
            ];
        }
        registeredIdCard.pop();

        // Delete the voter from the mapping
        delete voters[_idCard];

        // Emit an event or perform any other necessary actions
        emit VoterDeleted(voterId);
    }

    event VoterDeleted(string indexed voterId);

    function updateVoter(
        string memory uuid,
        string memory _newName
    ) public onlyAdmin {
        string memory _idCard = getIdCard[uuid].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");
        // require(msg.sender == voters[_idCard].account || isAdmin[msg.sender], "Unauthorized");
        voters[_idCard].name = _newName;

        // Emit an event or perform any other necessary actions
        emit VoterUpdated(msg.sender, _idCard, _newName);
    }

    event VoterUpdated(
        address indexed updater,
        string indexed idCard,
        string newName
    );

    function verifyVoter(string memory uuid) public onlyAdmin {
        string memory _idCard = getIdCard[uuid].idcard;
        require(voters[_idCard].isRegistered, "Voter not found");
        // require(msg.sender == voters[_idCard].account || isAdmin[msg.sender], "Unauthorized");
        voters[_idCard].isVerified = true;

        // Emit an event or perform any other necessary actions
        emit VoterVerify(msg.sender, _idCard);
    }

    event VoterVerify(address indexed updater, string indexed idCard);

    // End Voter Component

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

    function vote(uint candidateIndex, string memory _uuid) public voteActive {
        string memory _idCard = getIdCard[_uuid].idcard;
        require(
            voters[_idCard].isRegistered,
            "Only registered voters can vote"
        );
        require(!voted[_idCard], "Voter has already cast a vote");
        require(candidateIndex < candidates.length, "Invalid candidate index");

        // You can add additional conditions or permissions if needed

        candidates[candidateIndex].voteCount++;
        voted[_idCard] = true;
        voteTimestamp[_idCard] = block.timestamp;

        // Emit an event or perform any other necessary actions
        emit Voted(msg.sender, _idCard, candidateIndex);
    }

    event Voted(
        address indexed electionAccount,
        string indexed idCard,
        uint indexed candidateIndex
    );

    function generateUUID() internal view returns (string memory) {
        // Use a simple deterministic algorithm for demonstration
        // In a production environment, consider using an off-chain service for UUID generation
        bytes32 result = keccak256(
            abi.encodePacked(block.timestamp, msg.sender)
        );
        return Strings.toHexString(uint256(result), 32);
    }
}
