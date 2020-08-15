import  React from  "react";
import { Route } from  "react-router";

interface PrivateRouteProps{
    component: React.FC
    privateComponent: React.FC
    path: string
    exact: boolean
    condition:boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props:PrivateRouteProps) => {
    const {path, exact, privateComponent, condition } = props;

    return(
        condition ? (<Route  path={path}  exact={exact} component={privateComponent} />) :
            <props.component/>
    )
}
export  default  PrivateRoute;