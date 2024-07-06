import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {Stack} from "@mui/material";
import "./Home.css";
import Category from '../Category/Category';
// import ProductList from '../ProductList_DataGrid/ProductList';
import ProductList from '../ProductList/ProductList';

export default function Home(){
    return(
        <Stack direction="row" spacing={2}>
            <div style={{ flex: 2 }}>
                <Category />
            </div>

            <div style={{ flex: 10 }}>
                <ProductList />
            </div>
        </Stack>
    );
};