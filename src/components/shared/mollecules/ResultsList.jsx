import React from 'react'

export const ResultsList = (props) => {
    let { elements } = props;
    return (
        <div>
            <ul className="list-unstyled">
                {elements.map((e, index) => <li className="media" key={index}>
                    <img className="mr-3 img-thumbnail game-img-thumbnail" src={e.background_image} alt={e.slug}></img>
                    <div className="media-body">
                    <h5 className="mt-0 mb-1">{e.slug}</h5>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}
