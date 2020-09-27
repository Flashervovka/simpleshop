import React from "react";
import ProductCard from "../ProductCard";
import './styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
//import PerfectScrollbar from 'react-perfect-scrollbar'
import {IProduct} from "../../store/products/types";
import NewProduct from "../NewProduct";

interface ProductsListProps {
    productsList: IProduct[]
    onOpenProductDialog(isOpenDialogCreate: boolean, product?: IProduct, dialogStatus?: string): void
    onRemoveProduct(product: IProduct): void
    readOnly?:boolean
    categoryNameFilter:string
}


const ProductsList: React.FC<ProductsListProps> = (props: ProductsListProps) => {
    const {productsList, onOpenProductDialog, onRemoveProduct, readOnly, categoryNameFilter} = props;
    /*<PerfectScrollbar className="product-list-wrapper"></PerfectScrollbar>*/
    return (
        <div className="products-list">
            {!readOnly && <NewProduct onOpenProduct={onOpenProductDialog}/>}
            {
                productsList.map((product, index) => {
                        if(product.category === categoryNameFilter || categoryNameFilter === ""){
                           return (
                               <ProductCard
                                   readOnly={readOnly}
                                   key={`product_${index}`}
                                   productData={product}
                                   onOpenProduct={onOpenProductDialog}
                                   onRemoveProduct={onRemoveProduct}/>
                           )
                        }else{
                            return null
                        }
                    }
                )
            }
        </div>
    );
}

export default ProductsList;
