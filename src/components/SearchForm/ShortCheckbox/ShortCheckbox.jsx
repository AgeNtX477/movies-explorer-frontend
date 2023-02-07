import './ShortCheckbox.css'

function ShortCheckbox (props) {
  return (
    <fieldset className='ShortCheckbox'>
      <input type='checkbox' onChange={props.handleCheckboxSwitch} checked={props.isSwitched} className='ShortCheckbox__input' id='switch' />
      <label htmlFor='switch' className='ShortCheckbox__container'></label>
      <label htmlFor='switch' className='ShortCheckbox__subtitle'>
        Короткометражки
      </label>
    </fieldset>
  )
}

export default ShortCheckbox