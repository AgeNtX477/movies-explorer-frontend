import './AboutProject.css'

function AboutProject () {
  return (
    <section className='AboutProject' id='aboutproject'>
      <h2 className='AboutProject__title'>О проекте</h2>
      <div className='AboutProject__container'>
        <div className='AboutProject__semi-container'>
          <h3 className='AboutProject__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='AboutProject__caption'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='AboutProject__semi-container'>
          <h3 className='AboutProject__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='AboutProject__caption'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='AboutProject__schedule'>
        <div>
          <div className='AboutProject__schedule-weeks'>
            <p className='AboutProject__schedule-item'>1 неделя</p>
            <p className='AboutProject__schedule-item'>4 недели</p>
          </div>
          <div className='AboutProject__schedule-language'>
            <p className='AboutProject__schedule-caption'>Back-end</p>
            <p className='AboutProject__schedule-caption'>Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
