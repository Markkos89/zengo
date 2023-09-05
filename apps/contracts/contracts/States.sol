// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Constants.sol";

contract GStates is Constants {

    uint256 public startTime;
    State state;

    constructor () payable {
        startTime = block.timestamp;
    }

    function getState () public view returns (State) {
       
        uint256 _governanceCycle = calculateCurrentGovernanceCycle();

        uint256 day = (block.timestamp - startTime - (_governanceCycle * GOVERNANCE_CYCLE_LENGTH)) / 86400;

        if (day < STATE_COMPLETION_LENGTHS[0]) {
            return State(0);
        } else if (day >= STATE_COMPLETION_LENGTHS[0] && day < STATE_COMPLETION_LENGTHS[1]) {
            return State(1);
        } else if (day >= STATE_COMPLETION_LENGTHS[1] && day < STATE_COMPLETION_LENGTHS[2]) {
            return State(2);
        } else {
            return State(3);
        }

    }

    function getGovernanceCycle() public view returns (uint256) {
        return calculateCurrentGovernanceCycle();
    }

    function calculateCurrentGovernanceCycle() internal view returns (uint256) {
        return ((block.timestamp - startTime) / GOVERNANCE_CYCLE_LENGTH);
    }
}