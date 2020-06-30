import React from "react";
import ProductCard from "../ProductCard";
import './styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {IProduct} from "../../store/products/types";
import NewProduct from "../NewProduct";

interface ProductsListProps {
    productsList:IProduct[]
    onCreateNewProduct(isOpenDialogCreate:boolean):void
}


const ProductsList: React.FC<ProductsListProps> = (props: ProductsListProps) => {
    const {productsList, onCreateNewProduct} = props;
    return (
        <PerfectScrollbar>
            <div className="products-list">
                <NewProduct onCreateNewProduct={onCreateNewProduct}/>
                {
                    productsList.map((product, index) => <ProductCard key={`product_${index}`} productData={product}/>)
                }
            </div>
        </PerfectScrollbar>
    );
}

export default ProductsList;
