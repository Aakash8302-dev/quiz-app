import React from 'react'

function IncompatableDeviceScreen() {


const css = {
    root:{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem"
    }
}

return (
    <div style={{...css.root}}>
        <h1>Attend this Test only from Laptops or PCs</h1>
    </div>
  );
}

export default IncompatableDeviceScreen;
