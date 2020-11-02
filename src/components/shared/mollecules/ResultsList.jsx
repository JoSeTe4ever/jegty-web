import React from 'react'
import "./Mollecules.scss"

export const ResultsList = (props) => {
    let { elements, onSelect } = props;

    return (
        <div>
            <ul className="list-unstyled">
                {elements.map((e, index) => <li className="media cursor-pointer" key={index} onClick={() => {
                    onSelect(e)
                }}>
                    <img className="mr-3 img-thumbnail game-img-thumbnail" src={e.background_image} alt={e.slug}></img>
                    <div className="media-body">
                        <h5 className="mt-0 mb-1">{e.slug}</h5>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}
