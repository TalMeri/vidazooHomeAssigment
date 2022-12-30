import React from "react";
import axios from "axios";
import Button from "./Button";

const Download = ({ data }) => {

    const handleDownload = () => {
        const data2 = JSON.stringify({data})
        const type = 'application/json'
        return download(data2, type)
    }


    const download = (data1, type) => {
        let file = new Blob([data1], { type: type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, "ads_txt.json");
        else {
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = "ads_txt.json";
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    return (
        <Button label="download" onClick={handleDownload} />
    );
};

export default Download;