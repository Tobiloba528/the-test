import React from 'react';
import styled from "styled-components";


const TextError = (props) => {
    return ( 
        <Error className='error'>
            {props.children}
        </Error>
     );
}

const Error = styled.div`
    color: red
`
 
export default TextError;