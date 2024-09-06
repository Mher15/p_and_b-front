import { useState } from "react";
import ATTACH_FILE from "../../../../../public/images/icons/attach-file.svg";
import DELETE_ICON from "../../../../../public/images/icons/red-close.svg";
import { Button } from "antd";


export const EditPayments = () => {
    const [selectedStatus, setSelectedStatus] = useState('selfEmployed');
    const [selectedFiles, setSelectedFiles] = useState({
        otherDocument: null,
        passport1: null,
        passport2: null,
        ogrnip: null,
        bankDetails: null,
    });

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleFileChange = (event, type) => {
        setSelectedFiles({
            ...selectedFiles,
            [type]: event.target.files[0],
        });
    };

    const handleFileRemove = (type) => {
        setSelectedFiles({
            ...selectedFiles,
            [type]: null,
        });
    };

    return (
        <div>
            <div>
                {selectedStatus !== 'individual' && (

                    <div className="lk__payments-edit">
                        <h3>Выберите статус лица</h3>
                    </div>
                )}
                {selectedStatus !== 'individual' && (

                    <div className="lk__payments-face-status">
                        <div>
                            <label
                                className="components__radio filter__radio"
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="individual"
                                    checked={selectedStatus === 'individual'}
                                    onChange={handleStatusChange}

                                />
                                <span>
                                    <small> индивидуальный предприниматель</small>
                                </span>
                            </label>
                        </div>
                        <div>
                            <label
                                className="components__radio filter__radio"
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="selfEmployed"
                                    checked={selectedStatus === 'selfEmployed'}
                                    onChange={handleStatusChange}

                                />
                                <span>
                                    <small> самозанятый</small>
                                </span>
                            </label>
                        </div>
                    </div>
                )}
                <div className="lk__payments-edit-main">
                    <div className="lk__payments-edit">
                        <h3>Заполните форму</h3>
                    </div>
                    <div className="lk__user-main-info">
                        <input
                            type="text"
                            placeholder="фамилия"
                            name="value1"
                        />
                        <input
                            type="text"
                            placeholder="имя"
                            name="value2"
                        />
                        <input
                            type="text"
                            placeholder="отчество"
                            name="value2"
                        />
                    </div>
                    <div className="lk__user-main-info">
                        <input
                            type="date"
                            placeholder="дата рождения"
                            name="value1"
                        />
                        <input
                            type="text"
                            placeholder="телефон"
                            name="value2"
                        />
                        <input
                            type="text"
                            placeholder="email"
                            name="value2"
                        />
                    </div>
                </div>
                <div className="lk__payments-edit-main">
                    <div className="address">
                        <h5>Адрес регистрации</h5>
                    </div>
                    <div className="lk__user-main-info">
                        <input
                            type="text"
                            placeholder="почтовой индекс"
                            name="value1"
                        />
                        <select
                        >
                            <option>Ростов-на-Дону</option>
                            <option>test1</option>
                            <option>test1</option>
                        </select>
                    </div>
                    <div className="lk__address-info">
                        <input
                            type="text"
                            placeholder="Улица"
                            name="value1"
                        />
                        <input
                            type="text"
                            placeholder="дом"
                            name="value2"
                        />
                        <input
                            type="text"
                            placeholder="Квартира"
                            name="value2"
                        />
                    </div>
                </div>
                {selectedStatus !== "individual" && (

                    <div className="lk__payments-edit-main">
                        <div className="pasport">
                            <h5>Паспорт</h5>
                        </div>
                        <div className="lk__user-main-info">
                            <input
                                type="text"
                                placeholder="Серия"
                                name="value1"
                            />
                            <input
                                type="text"
                                placeholder="номер"
                                name="value2"
                            />
                            <input
                                type="text"
                                placeholder="код подрозделения"
                                name="value2"
                            />
                        </div>
                        <div className="lk__pasport-info">
                            <input
                                type="date"
                                placeholder="дата выдачи"
                                name="value1"
                            />
                            <input
                                type="text"
                                placeholder="Кем выдан"
                                name="value2"
                            />
                        </div>
                    </div>
                )}

                <div className="lk__payments-edit-main">
                    <div className="pasport">
                        <h5>Реквизиты</h5>
                    </div>
                    <div className="lk__user-main-info">
                        <input
                            type="text"
                            placeholder="личный ИНН"
                            name="value1"
                        />
                        <input
                            type="text"
                            placeholder="наименования банка"
                            name="value2"
                        />
                        <input
                            type="text"
                            placeholder="БИК"
                            name="value2"
                        />
                    </div>
                    <div className="lk__rekvizit-info">
                        <input
                            type="text"
                            placeholder="р/счет"
                            name="value1"
                        />
                        <input
                            type="text"
                            placeholder="к/счет"
                            name="value2"
                        />

                    </div>
                </div>
                <div className="lk__documents">
                    <div className="lk__documents__title">
                        <h5>копии документов</h5>
                    </div>
                    <div>
                        <span>для регистрации самозанятого в системе выплат неооходимо прикрепить копии (сканы) документов в формате <b> PNG, JPG, JPEG, РDF. Размер каждого файла должен быть не более 10 Мб</b></span>
                    </div>
                    {selectedStatus !== 'individual' ? (
                        <div className="lk__documents__first-doc">
                            <div>
                                <span><b>01.</b> Справка о постановке на учет (снятии с учета) физического лица в качестве налогоплательщика налога на профессиональный доход</span>
                            </div>
                            <div className="lk__documents__first-doc__attach">
                                <img src={ATTACH_FILE} alt="Attach File Icon" />
                                <div>
                                    <label className="attach-file-label">
                                        {selectedFiles.otherDocument ? selectedFiles.otherDocument.name : "Прикрепить файл"}
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, 'otherDocument')}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                                {selectedFiles.otherDocument && <p>(файл одобрен)</p>}
                                {selectedFiles.otherDocument && (
                                    <img
                                        src={DELETE_ICON}
                                        alt="Delete File Icon"
                                        onClick={() => handleFileRemove('otherDocument')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (<><div className="lk__documents__first-doc">
                        <div>
                            <span><b>01.</b> Личный ИНН</span>
                        </div>
                        <div className="lk__documents__first-doc__attach">
                            <img src={ATTACH_FILE} alt="Attach File Icon" />
                            <div>
                                <label className="attach-file-label">
                                    {selectedFiles.otherDocument ? selectedFiles.otherDocument.name : "Прикрепить файл"}
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'otherDocument')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            {selectedFiles.otherDocument && <p>(файл одобрен)</p>}
                            {selectedFiles.otherDocument && (
                                <img
                                    src={DELETE_ICON}
                                    alt="Delete File Icon"
                                    onClick={() => handleFileRemove('otherDocument')}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div><div className="lk__documents__first-doc">
                            <div>
                                <span><b>02.</b> ОГРНИП</span>
                            </div>
                            <div className="lk__documents__first-doc__attach">
                                    <img src={ATTACH_FILE} alt="Attach File Icon" />
                                    <div>
                                        <label className="attach-file-label">
                                            {selectedFiles.ogrnip ? selectedFiles.ogrnip.name : "Прикрепить файл"}
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e, 'ogrnip')}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    {selectedFiles.ogrnip && <p>(файл одобрен)</p>}
                                    {selectedFiles.ogrnip && (
                                        <img
                                            src={DELETE_ICON}
                                            alt="Delete File Icon"
                                            onClick={() => handleFileRemove('ogrnip')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                        </div></>
                    )}
                    <div className="lk__documents__first-doc">
                        <div>
                            <span><b>{selectedStatus !== 'individual' ? "02." : "03."}</b> Паспорт (разворот и прописка)</span>
                        </div>
                        <div className="lk__documents__first-doc__attach">
                                    <img src={ATTACH_FILE} alt="Attach File Icon" />
                                    <div>
                                        <label className="attach-file-label">
                                            {selectedFiles.passport1 ? selectedFiles.passport1.name : "Прикрепить файл"}
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e, 'passport1')}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    {selectedFiles.passport1 && <p>(файл одобрен)</p>}
                                    {selectedFiles.passport1 && (
                                        <img
                                            src={DELETE_ICON}
                                            alt="Delete File Icon"
                                            onClick={() => handleFileRemove('passport1')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                                <div className="lk__documents__first-doc__attach">
                                    <img src={ATTACH_FILE} alt="Attach File Icon" />
                                    <div>
                                        <label className="attach-file-label">
                                            {selectedFiles.passport2 ? selectedFiles.passport2.name : "Прикрепить файл"}
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e, 'passport2')}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    {selectedFiles.passport2 && <p>(файл одобрен)</p>}
                                    {selectedFiles.passport2 && (
                                        <img
                                            src={DELETE_ICON}
                                            alt="Delete File Icon"
                                            onClick={() => handleFileRemove('passport2')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                    </div>
                    <div className="lk__documents__first-doc">
                        <div>
                            <span><b>03.</b> Роквизиты банка</span>
                        </div>
                        <div className="lk__documents__first-doc__attach">
                            <img src={ATTACH_FILE} alt="Attach File Icon" />
                            <div>
                                <label className="attach-file-label">
                                    {selectedFiles.bankDetails ? selectedFiles.bankDetails.name : "Прикрепить файл"}
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'bankDetails')}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            {selectedFiles.bankDetails && <p>(файл одобрен)</p>}
                            {selectedFiles.bankDetails && (
                                <img
                                    src={DELETE_ICON}
                                    alt="Delete File Icon"
                                    onClick={() => handleFileRemove('bankDetails')}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lk__edit-buttons">
                <button className="btn btn--sm">
                    Назад
                </button>
                <button className="btn btn--sm">
                    Редактировать
                </button>

            </div>
        </div>
    );
};
