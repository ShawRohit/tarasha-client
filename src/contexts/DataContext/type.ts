import {  ReactNode} from "react";
import { SiteData } from "../../utils/type";

interface DataContextType {
    data: SiteData;
    setData: React.Dispatch<React.SetStateAction<SiteData>>;
    children?: ReactNode;
}

export type {
    DataContextType
}