const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// signer - You
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("The message is: " + message);

    console.log("Updating the message...");
    const tx = await helloWorldContract.update("this is the new message");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The message is: " + newMessage);

    try {
        console.log("Verifying contract...");
    } catch (error) {
        if (error.message.includes("Reason: Already Verified")) {
            console.log("Contract is already verified!")
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });