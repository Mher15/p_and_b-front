import React from 'react';

export const Taxation = () => {
  const handleDownload = () => {
    const fileUrl = 'https://disk.yandex.ru/i/_PYwsyw-HDQrgg';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', true);
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };
  return <div className="taxation">
    <div className="texation-text">
      <span>Мы собрали для вас полноценную инструкцию с методическими рекомендациями по налогообложению для партнеров на 2024 год.</span>
      <span>Текст данной инструкции не требует специальных знаний налогового, бухгалтерского и гражданского законодательства и поможет ответить на большинство ваших вопросов</span>
    </div>
    <div>
      <button className="btn btn--sm" onClick={handleDownload}>
        Скачать презентацию налогообложения ИП</button>
    </div>
  </div>
}