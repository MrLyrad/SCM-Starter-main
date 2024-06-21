# Project - Function Frontend - ETH + AVAX

In this project, we are tasked to create a simple contract with 2-3 user-defined functions. The Solidity contract named `myFunctionFrontend.sol` has the necessary Solidity code that enables the displaying of the output to the frontend of the application.

## Description

For this project, I decided to create a simple Smart Contract that lets users control a supply of tokens. The error handling comes in handy when validating the user input, ensuring that the code does not break while executing and that gas is not completely wasted.

## Overview

The following functions found in `myFunctionFrontend.sol` were defined as follows:

*1. addTokens(uint _i)* - This function ensures that the user input is a number divisible by 5 to add from the `tokenSupply`.

*2. subTokens(uint _i)* - This function ensures that the user input is a number divisible by 5 to subtract from the `tokenSupply`.

*3. showTokens()* - This function shows the number of tokens stored in the `tokenSupply`.

*4. numSub()* - This function shows the number of subtractions the user is still able to perform, the initialized maximum subtractions is **2**.

### Running the Contract in Remix IDE.

* Open [Remix IDE](https://remix.ethereum.org/).
* Inside Remix IDE, create a new file and paste the contents of `mySmartContract.sol` or upload the file itself to the IDE.
* Ensure that the compiler version is set to `0.8.18`.
* Hit `Ctrl` + `S` on your keyboard to compile the smart contract.
* Deploy the compiled contract by navigating to the sidebar of the IDE and then click `Deploy`.
* To interact with the variables, drop down the `Deployed Contracts` menu and place your input in the respective bins.

## Authors

Daryl Juacalla
[@MrLyrad](https://github.com/MrLyrad)


## License

This project is licensed under the MIT License.
