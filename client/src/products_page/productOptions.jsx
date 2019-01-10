import React from 'react';

export default ({ variants, handleOptions, gender, color, size }) => {
    if (!variants.male.length && !variants.female.length) {
        return (
            <div className='optionsContainer'>
                <p style={{ color: 'red' }}>Sorry, this item is out of stock</p>
            </div>
        )
    }

    return (
        <div className='optionsContainer'>
            <div>
                <p className="optionsTitle">Gender</p>
                <select className="selectGender" onChange={handleOptions}>
                    {variants.male.length > 0 ? <option value='male' onChange={handleOptions}>Male</option>
                        : null}

                    {variants.female.length > 0 ? <option value='female' onChange={handleOptions}>Female</option>
                        : null}

                    <option value="">none</option>
                </select>
            </div>
            <div>
                <p className="optionsTitle">Color</p>
                {gender === "" ? <div className="colorsContainer">
                    <p>----</p>
                </div> : <div className="colorsContainer">
                        {variants[gender].map(size => {
                            return (<span
                                id={size.color}
                                className={color === size.color ? 'colorOption selectedColor' : 'colorOption'}
                                title={`color: ${size.color}`}
                                onClick={handleOptions} />)
                        }
                        )}
                    </div>}
            </div>
            {color !== null && gender ?
                <div>
                    <p className="optionsTitle">Size</p>
                    <select className="selectSize" value={size} onChange={handleOptions}>
                        {mapSizeOptions(variants, gender, color)}
                    </select>
                </div> : null}
        </div>
    )
}

/**
 * finds available sizes for a given color and gender and maps them to html option tags
 * @param {*} variants 
 * @param {*} gender 
 * @param {*} color 
 */
let mapSizeOptions = (variants, gender, color) => {
    return variants[gender].find(e => e.color === color) && variants[gender].find(e => e.color === color).sizes.map(size => {
        console.log(size);
        return (
            <option key={size.id} value={size.size} >{size.size}</option>
        )
    })
}