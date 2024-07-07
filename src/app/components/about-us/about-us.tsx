export const AboutUs = () => {
  return (
    <main className="main about">
      <section className="about__section">
        <div className="container">
          <div className="about__top">
            <h1 className="title about__title">О компании</h1>
            <div className="about__wrapper">
              <div className="about__text-content">
                <p>
                  <b>BEST & PEOPLE</b> - молодая амбициозная компания, созданная
                  в 2024 году командой опытных МЛМ предпринимателей и
                  профессионалами в области сбалансированного питания, которая
                  помогает людям по всему миру вести активный и здоровый образ
                  жизни.
                </p>
                <p>
                  У нас абсолютно новая, инновационная система вознаграждения,
                  которая позволит каждому партнеру уже с первых шагов
                  почувствовать прелести и преимущества сетевого бизнеса. Мы
                  создали специальные программы лояльности для поддержки, как
                  молодых, так и опытных МЛМ предпринимателей.
                </p>
              </div>
              <div className="about__logo">
                <img src="/images/logo.svg" alt="" />
              </div>
            </div>
          </div>
          <ul className="about__features">
            <li className="about__feature lg">
              <div className="about__feature-icon">
                <img src="/images/about_feature-icon.svg" alt="" />
              </div>
              <div className="about__feature-text">
                <h2 className="title title--sm">
                  Старт <br /> продаж
                </h2>
                <p>
                  Создание в России компании по производству продуктов для
                  сбалансированного питания и их продвижению через Независимых
                  Партнеров
                </p>
              </div>
            </li>
            <li className="about__feature">
              <div className="about__feature-icon">
                <img src="/images/about_feature-icon_2.svg" alt="" />
              </div>
              <div className="about__feature-text">
                <h2 className="title title--sm">
                  Продуктовая <br /> линейка
                </h2>
                <p>
                  Большая продуктовая линейка. Продукты компании основаны на
                  последних научных достижениях
                </p>
              </div>
            </li>
            <li className="about__feature lg">
              <div className="about__feature-icon">
                <img src="/images/about_feature-icon_3.svg" alt="" />
              </div>
              <div className="about__feature-text">
                <h2 className="title title--sm">
                  Контроль <br /> качества продуктов
                </h2>
                <p>
                  Компания обеспечивает высокий уровень контроля качества на
                  всех этапах производственного цикла
                </p>
              </div>
            </li>
            <li className="about__feature">
              <div className="about__feature-icon">
                <img src="/images/about_feature-icon_4.svg" alt="" />
              </div>
              <div className="about__feature-text">
                <h2 className="title title--sm">
                  Привилегии <br /> партнеров
                </h2>
                <p>
                  Помощь Независимым Партнерам в достижении личных целей в
                  бизнесе
                </p>
              </div>
            </li>
          </ul>
          <div className="about__mission-wrapper">
            <div className="about__bp">
              <img src="/images/bp.png" alt="" />
            </div>
            <div className="about__mission">
              <h2 className="title">Наша миссия</h2>
              <ul className="components__list full about__list">
                <li>
                  Мы используем прогрессивный биохакинг для создания
                  инновационных продуктов, способных сделать каждого человека
                  более эффективным и успешным, повысить когнитивные функции
                  мозга, качественно усилить возможности всего организма.
                </li>
                <li>
                  Предоставлять возможность для Независимых Партнеров вести
                  выгодный бизнес в партнерстве с компанией.
                </li>
                <li>
                  Для Клиентов — пользоваться качественными продуктами для
                  здорового образа жизни
                </li>
                <li>
                  Мы активно внедряем научные открытия и передовые технологии,
                  создаём инновационные продукты с доказанной эффективностью для
                  полноценной и качественной жизни.
                </li>
              </ul>
            </div>
          </div>
          <div className="about__bottom">
            <h2 className="title">Ответственность компании Best&People</h2>
            <div className="about__bottom-text">
              <p>
                До сих пор существует риск столкнуться с мошенничеством в виде
                пирамиды – подобного рода организации все еще продолжают
                возникать. Мы стараемся информировать людей о недобросовестном
                бизнесе, чтобы никто не понес серьезные финансовые потери.
              </p>
              <p>
                Как отличить финансовую пирамиду от добросовестной коммерческой
                структуры?
              </p>
              <p>В этом вам поможет ряд полезных ресурсов:</p>
            </div>
            <ul className="components__list full about__list">
              <li>
                <b>Черный список Центробанка России</b> список компаний с
                выявленной нелегальной финансовой деятельностью <br />{" "}
                <a href="https://www.cbr.ru/inside/BlackList/">
                  https://www.cbr.ru/inside/BlackList/
                </a>
              </li>
              <li>
                <b>Материалы Ассоциации Прямых Продаж в России</b>. Они помогут
                вам отличить замаскированную пирамиду от добросовестного
                предприятия:
                <br />{" "}
                <a href="https://cloud.mail.ru/public/xpF7/5fjhonsvZ">
                  https://cloud.mail.ru/public/xpF7/5fjhonsvZ
                </a>{" "}
                <a href="https://cloud.mail.ru/public/9xvd/GYdGLPXHw">
                  https://cloud.mail.ru/public/9xvd/GYdGLPXHw
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
