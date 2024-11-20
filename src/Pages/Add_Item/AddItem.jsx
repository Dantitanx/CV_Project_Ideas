import "./AddItem.css";
import { createProduct } from "../../contexts/CreatProduct";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import app from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const storage = getStorage(app);

export default function AddItem() {

    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [price,setPrice ] = useState("");
    const [size, setSize] = useState("");
    const [message, setMessage] = useState("");

    
    const navigate = useNavigate();

    function handleFileChange(e) {
        if(e.target.files[0]){
            setImageFile(e.target.files[0]);
        }        
    }

    async function handleAddProduct(e) {
        e.preventDefault();
        setMessage("");


        if(!imageFile){
            setMessage("Please select an image!");
            return;
        }


        try {
            const imageRef = ref(storage, `products/${imageFile.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // TODO Optionally handle upload progress here
                },
                (error) => {
                    console.error("Error uploading image:", error);
                    setMessage("Failed to upload image.");
                },
                async () => {
                    
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    
                    const product = {
                        product_name: name,
                        product_price: price,
                        product_size: size,
                        product_image: downloadURL, 
                    };

                    
                    await createProduct(product);

                    setMessage("Item has been added successfully!");
                    setName("");
                    setPrice("");
                    setSize("");
                    setImageFile(null);
                    navigate('/');
                }
            );

        } catch (error) {
            console.error("Error adding the product:", error)
            setMessage("Failed to add item.")
        }
    }

    return(
        <div className="add-product-container">
            <h1>Add a new product</h1>
            <form onSubmit={handleAddProduct}>
                <input type="text" placeholder="The product's name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="The product's size" value={size} onChange={(e) => setSize(e.target.value)} />
                <input type="text" placeholder="The product's price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}