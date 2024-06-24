# Project - Function Frontend - ETH + AVAX

In this project, we are tasked to create a simple contract with 2-3 user-defined functions. The Solidity contract named `Assessment.sol` has the necessary Solidity code that enables the displaying of the output to the frontend of the application. This project utilized the template provided by MetaCrafters.

## Description

For this project, I decided to tweak and revise a simple Smart Contract from a previous project that lets users control a supply of tokens. Proper error handling functions were utilized in validating the user input, ensuring that the code does not break while executing and that gas is not completely wasted. In addition, a `.js` file allows the contract to have a frontend that lets users interact with the system.

## Overview

The following functions found in `Assessment.sol` were defined as follows:

*1. addTokens(uint _i)* - This function ensures that the user input is a number divisible by 5 to add from the `tokenSupply`.

*2. transTokens(uint _i, address _add)* - This function ensures that the user input is a number divisible by 5 to subtract from the `tokenSupply`. In addition, the function also requires the user to input a valid address for the receiver of the tokens to be transferred.

*3. showTokens()* - This function shows the number of tokens stored in the `tokenSupply`.

*4. numTrans()* - This function shows the number of transactions the user is still able to perform; the initialized maximum subtractions is **2**.

### Running the Contract in Remix IDE.

* Open the file in VS Code.
* Inside VS Code, run the following in the terminal:
  * Inside the project directory, in the terminal type: `npm i`
  * Open two additional terminals in your VS code
  * In the second terminal type: `npx hardhat node`
  * In the third terminal, type: `npx hardhat run --network localhost scripts/deploy.js`
  * Back in the first terminal, type `npm run dev` to launch the front-end.
After this, the project will be running on your localhost. Typically at `http://localhost:3000/`

## Authors

Daryl Juacalla
[@MrLyrad](https://github.com/MrLyrad)


## License

This project is licensed under the MIT License.
