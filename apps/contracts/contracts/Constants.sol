// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Constants {
    enum State {
        Verification,
        Voting,
        Funding,
        RewardsDistribution
    }

    uint256 public constant GOVERNANCE_CYCLE = 0;

    uint256 public constant THRESHOLD_VOTE_LIMIT = 51;

    uint256 public constant GOVERNANCE_CYCLE_LENGTH = 2595000;

}