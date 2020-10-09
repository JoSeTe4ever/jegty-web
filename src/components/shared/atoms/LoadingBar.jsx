import React from 'react'


export const LoadingBar = (props) => {
    const {progress} =  props;
    const innerProgress = progress ? progress : 100;
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-valuenow="100" aria-valuemin="0" 
            aria-valuemax="100" style={{ width: `${innerProgress}%` }}></div>
        </div>
    )
}
