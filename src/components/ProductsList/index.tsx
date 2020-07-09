import React from "react";
import ProductCard from "../ProductCard";
import './styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {IProduct} from "../../store/products/types";
import NewProduct from "../NewProduct";

interface ProductsListProps {
    productsList: IProduct[]
    onOpenProductDialog(isOpenDialogCreate: boolean, product?: IProduct, dialogStatus?: string): void
    onRemoveProduct(product: IProduct): void
}


const ProductsList: React.FC<ProductsListProps> = (props: ProductsListProps) => {
    const {productsList, onOpenProductDialog, onRemoveProduct} = props;
    return (
        <PerfectScrollbar className="product-list-wrapper">
            <div className="products-list">
                <NewProduct onOpenProduct={onOpenProductDialog}/>
                {
                    productsList.map((product, index) =>
                        <ProductCard
                            key={`product_${index}`}
                            productData={product}
                            onOpenProduct={onOpenProductDialog}
                            onRemoveProduct={onRemoveProduct}/>
                    )
                }
            </div>
        </PerfectScrollbar>
    );
}

export default ProductsList;
