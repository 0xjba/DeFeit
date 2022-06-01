import { ethers } from "ethers";
import { useState } from "react";
import abi from "../constants/abi";

const Upload = (props) => {
    const contractAddress="0xF7D50F2e91807D521521692c25B37C7b19EfCB70";
    const contractABI = abi.abi;
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [batchNum, setBatchNum] = useState("");

    const onNameChange = (event) => {
        setName(event.target.value);
    } 

    const onPriceChange = (event) => {
        setPrice(event.target.value);
    }

    const onBatchNumChange = (event) => {
        setBatchNum(event.target.value);
    }

    async function upload() {
        const provider = props.provider;
        const signer = provider.getSigner();
        const manufacturer = new ethers.Contract(contractAddress, contractABI, signer);
        try {
            console.log("Uploading details");
            const uploadData =  await manufacturer.setDrugDetails(
                name ? name : window.alert("error"),
                price ? price : "200",
                batchNum ? batchNum : "hello",
            )

        } catch(e) {
            console.log(e);
        }
    }
    async function view() {
        const provider = props.provider;
        const signer = provider.getSigner();
        const manufacturer = new ethers.Contract(contractAddress, contractABI, signer);
        try {
            console.log("Fetching details");
            const viewData =  await manufacturer.getDrugDetails("0xBA97fD3c50f1D10Ec9a8ebbF2d273213306c30C2", 2)
            console.log(viewData.name);
            console.log(viewData.price);
            console.log(viewData.batchNum);

        } catch(e) {
            console.log(e);
        }
    }
    return(
        <div>        
           <main>
            {props.active ? (
               <div>
                   <form>
                    <h3>Upload Drug Details</h3>
                       <br />
                       <div>
                           <label>Drug Name:</label>
                           <br />
                           <input
                            id="name"
                            type="text"
                            onChange={onNameChange}
                            />
                       </div>
                       <div>
                           <label>Batch No:</label>
                           <br />
                           <input
                            id="number"
                            min="1"
                            type="text"
                            onChange={onBatchNumChange}
                            />
                       </div>
                       <div>
                           <label>Drug Price:</label>
                           <br />
                           <input
                            id="price"
                            type="number"
                            min="1"
                            onChange={onPriceChange}
                            />
                       </div>
                       <br />
                       <button type="button" onClick={() => upload()}>Upload</button>

                       View Drug details
                       <button type="button" onClick={() => view()}>view</button>

                   </form>
               </div>
               ): (<>Connect Wallet</>)}
           </main>
        </div>
    )
}

export default Upload