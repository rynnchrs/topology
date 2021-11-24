import React, {useState, useEffect, useRef } from 'react';


export default function PDFget() {

    useEffect(() => {
        doPDF();
    }, []);

    const doPDF = () => {
        console.log("dioing PDF")
        const windowUrl = window.location.href;
        let splitURL = windowUrl.split("=");
        
        console.log("winURL: ", windowUrl)
        console.log("splitURL: ", splitURL);
        console.log("recordID: ", splitURL[1]);

    }

    return(
        <div>
            i will get the PDF ID
        </div>

    )

}