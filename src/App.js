import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Web3 from "web3";
// import SimpleContract from "./SimpleContract.json";
// import Login from "./Login.json";
import Mood from "./Mood.json";
import { ethers } from "ethers";

function App() {
  const [walletaddress, setwalletaddress] = useState("");
  const [web3, setweb3] = useState("");
  // const [contract, setcontract] = useState();
  // const [fcoins, setfcoins] = useState();
  const [moods, setmoods] = useState();
  const [currentmood, setcurrentmood] = useState();
  const [changemood, setchangemood] = useState();

  useEffect(() => {
    async function getaccount() {
      let _web3 = new Web3(
        "https://eth-goerli.g.alchemy.com/v2/VRkzcqKw66q7M87aTcu8Vh0BzIcDsg_i"
      );
      console.log(web3);
      console.log(typeof web3.eth);
      setweb3(_web3);
      if (window.ethereum) {
        console.log("Metamask wallet detected");

        //Now as the metamask wallet is detected we now get the details of all the accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts[0]);
        setwalletaddress(accounts[0]);
      }

      //Inside the useEffect we are also creating instances of the smart contract
      // let _contract = await web3.eth.Contract(
      //   SimpleContract,
      //   "0xdCc84c7D157aeE26CE6aB2113E8C8Ca1cCc65519"
      // );

      // var myContract = new _web3.eth.Contract(
      //   SimpleContract,
      //   "0xdCc84c7D157aeE26CE6aB2113E8C8Ca1cCc65519",
      //   {
      //     from: walletaddress, // default from address
      //     gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
      //   }
      // );

      // const instance1 = await new _web3.eth.Contract(
      //   SimpleContract.abi,
      //   "0x4A619eC9A8Db54E33D56ba3b0b8690c4cD698FB1",
      //   {
      //     from: walletaddress, // default from address
      //     // gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
      //   }
      // );

      // setcontract(instance1);

      // const instance2 = await new _web3.eth.Contract(
      //   Login.abi,
      //   "0xB9285168732250ec1B1254440c0c806b6E532626"
      // );

      const instance3 = await new _web3.eth.Contract(
        Mood.abi,
        "0xbd02dBb26A312E7EAe82f080B00F30f387639b02"
      );

      setmoods(instance3);

      // setfcoins(instance2);
      console.log("The smart contract has been initalized");
    }

    getaccount();
  }, []);

  // async function createaccount() {
  //   console.log("The account creation process is being held");
  //   const account = await web3.eth.accounts.create();
  //   console.log(account);
  // }

  // async function callfnc() {
  //   console.log("The function is called");
  //   contract.methods
  //     .mymethod()
  //     .call({ from: walletaddress }, function (error, result) {
  //       console.log(result);
  //       if (error) {
  //         console.log("Some error has occured while calling the function");
  //         console.log(error);
  //       }
  //     });
  // }

  // async function loginclicked() {
  //   console.log("The login button has been clicked");

  //   //Now as the login button has been clicked we will sign a message that  we received from the smart contract
  //   //Let us assume this is the message

  //   let message = "User is trying to login";

  //   //Now we need to get the hash from the message
  //   let hash = await fcoins.methods.getMessageHash(message).call({
  //     from: walletaddress,
  //   });

  //   console.log("This is the hash that we got from the smart contract");
  //   console.log(hash);

  //   // let hash =
  //   //   "0x9c97d796ed69b7e69790ae723f51163056db3d55a7a6a82065780460162d4812";

  //   // console.log(web3.eth.personal.sign);

  //   // // let signature = await web3.eth.personal.sign(
  //   // //   message,
  //   // //   walletaddress,
  //   // //   "test password!"
  //   // // );

  //   // let data = await web3.eth.sign("Hello world", walletaddress);
  //   // //sign(keccak256("\x19Ethereum Signed Message:\n" + dataToSign.length + dataToSign)))

  //   // let balance = await web3.eth.getBalance(walletaddress);
  //   // console.log(balance);

  //   // console.log("This is the signature", data);

  //   let data = await window.ethereum.request({
  //     method: "personal_sign",
  //     params: [walletaddress, hash],
  //   });

  //   console.log("This is the signature data:", data);

  //   let final = await fcoins.methods.verify(walletaddress, message, data).call({
  //     from: walletaddress,
  //   });
  //   console.log("After verifying the user the data that we got is:");
  //   console.log(final);
  // }

  async function moodfnc() {
    // let mood = await moods.methods.getmood().call({
    //   from: walletaddress,
    // });

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(
      moods.options.address,
      Mood.abi,
      signer
    );

    let mood = await contract.getmood({
      from: walletaddress,
    });

    console.log("This is the mood of the last person");
    console.log(mood);
    setcurrentmood(mood);
  }

  async function changefnc() {
    // let mood = await moods.methods.changemood(changemood).send({
    //   from: walletaddress,
    // });

    // console.log("The mood has been changed");
    // console.log(mood);

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(
      moods.options.address,
      Mood.abi,
      signer
    );

    let data1 = await contract.changemood(changemood, {
      from: walletaddress,
    });

    console.log(data1);
    console.log("This is the data1", data1.toString());
  }

  return (
    <div className="App">
      <h1>This is the wallet address of the user</h1>
      <p>{walletaddress}</p>
      {/* <button
        onClick={(e) => {
          createaccount();
        }}
      >
        Create an account
      </button>
      <button
        onClick={(e) => {
          loginclicked();
        }}
      >
        Login
      </button>
      <button
        onClick={(e) => {
          callfnc();
        }}
      >
        Call the function
      </button> */}
      <button
        onClick={(e) => {
          moodfnc();
        }}
      >
        Get the mood
      </button>

      <p>Set the mood</p>
      <input
        type="text"
        value={changemood}
        onChange={(e) => {
          setchangemood(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          changefnc();
        }}
      >
        Click to change the current mood
      </button>
      <p>Current mood is:{currentmood}</p>
    </div>
  );
}

export default App;
