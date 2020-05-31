import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";

function LoadingBar({loading}) {
  return (
    <div style={{backgroundColor: 'white', height:'auto', width:'auto'}}>
    <br /><br /><br /><br />
    <div style={{display:'flex', justifyContent:'center'}}>
      <CircleLoader
            size={50}
            color={'teal'}
            loading={loading}
      />
    </div>
    <br /><br /><br /><br />
    </div>
  );
}

export default LoadingBar;
