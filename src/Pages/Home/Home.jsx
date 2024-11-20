import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Navbar from '../../components/Navbar/Navbar';
import { polo_hosszu_kesz } from '../../Images';
import { BASE_URL } from '../../contexts/CreatProduct';

async function fetchProducts() {
    const response = await fetch(BASE_URL, {
        method: "GET",
    });
    if (!response.ok) {
        console.error("Failed to fetch products!");
        throw new Error("Failed to fetch products!");
    }
    const data = await response.json();
    if (!data) return [];
    return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
    }));
}

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getProducts() {
            try {
                const productData = await fetchProducts();
                setProducts(productData);
            } catch (error) {
                console.error("Error fetching products: ", error)
                setError("Failed to fetch products.")
            }
        }
        getProducts();
    }, [])

    return (
        <div className="home">
            <header className="header">
                <div className="logo">
                    <span>BIKE X BOLT</span>
                </div>
                <Navbar />
            </header>

            <main className="hero">
                <div className="hero-content">
                    <p className="hero-subtitle">ÚJ ÁRUK</p>
                    <h1 className="hero-title">
                        új <span role="img" aria-label="wave">👋</span> Termékek mindenkinek
                    </h1>
                    <Link to="/latest-collection" className="hero-button">Legújabb termékek →</Link>
                </div>
                <div className="hero-image">
                    <img src={polo_hosszu_kesz} alt="Model" />
                </div>
            </main>
            <div className="products-container">
                <h1>Termékeink</h1>
                {error && <p className="error">{error}</p>}
                {products.map((product) => (
                    <div className="card" style={{ width: "18rem" }} key={product.id}>
                        <img src={product.product_image} className="card-img-top" alt={product.product_name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.product_name}</h5>
                            <p className="card-price">Price: ${product.product_price}</p>
                            <p className="card-size">Size: {product.product_size}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Home;
