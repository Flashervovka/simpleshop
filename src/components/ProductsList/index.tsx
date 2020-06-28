import React from "react";
import ProductCard from "../ProductCard";
import './styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

interface ProductsListProps {
}


const ProductsList: React.FC<ProductsListProps> = (props: ProductsListProps) => {
    //const {onSendFile} = props;
    return (
        <PerfectScrollbar>
            <div className="products-list">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </PerfectScrollbar>
    );
}

export default ProductsList;
