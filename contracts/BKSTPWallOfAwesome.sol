// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BKSTPWallOfAwesome is Ownable {

  IERC20 private token;
  mapping(address => bool) public whitelist;
  uint256 public whitelistedNumber = 0;

  mapping (bytes32 => Submission) public submissions;
  bytes32[] public submissionIndex;

  event Whitelisted(address addr, bool status);
  event SubmissionCreated(uint256 index, string content, address submitter, address recipient);
  event TokensTransferred(address recipient, uint256 amount);

  struct Submission {
    string content;
    uint256 index;
    address submitter;
    address recipient;
    bool exists;
  }

  modifier whitelistOnly {
    require(whitelist[msg.sender]);
    _;
  }

  constructor(IERC20 _token) {
    token = _token;
  }

  function submissionExists(bytes32 hash) public view returns (bool) {
    return submissions[hash].exists;
  }

  function createSubmission(string calldata _content, address _recipient) whitelistOnly external {
    
    console.log("createSubmission, _content:", _content);
    require(whitelist[_recipient], "Recipient must be whitelisted");

    bytes32 hash = keccak256(abi.encodePacked(_content, block.number));

    require(!submissionExists(hash), "Submission must not already exist in the same block!");

    submissionIndex.push(hash);

    submissions[hash] = Submission(
      _content,
      submissionIndex.length - 1,
      msg.sender,
      _recipient,
      true
    );

    emit SubmissionCreated(
      submissions[hash].index,
      submissions[hash].content,
      submissions[hash].submitter,
      submissions[hash].recipient
    );

    // transferFrom 100 BKSTP tokens to recipient
    token.transferFrom(msg.sender, _recipient, 100);

    emit TokensTransferred(_recipient, 100);
  }

  function getSubmission(bytes32 _hash) public view returns (string memory content, address submitter) {
    return (submissions[_hash].content, submissions[_hash].submitter);
  }

  function getAllSubmissionHashes() public view returns (bytes32[] memory) {
    return submissionIndex;
  }

  function getSubmissionCount() public view returns (uint256) {
    return submissionIndex.length;
  }

  function whitelistBatch(address[] calldata _users) onlyOwner public {
    for (uint i = 0; i < _users.length; i++) {
      require(!whitelist[_users[i]], "Candidate must not be whitelisted.");
      whitelist[_users[i]];
      whitelistedNumber++;
      emit Whitelisted(_users[i], true);
    }
  }
}

