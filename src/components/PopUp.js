import smiley from '../images/smiley.jpg'

export default function PopUp(props) {
    
    return (
        <div className='popup'>
            <button className='close-button' id="close" onClick={() => props.handleClick(false)} />
            <p>Are you sure that all dice are equal?</p>
            <img src={smiley} className='popup-icon' />
        </div>
    )
}