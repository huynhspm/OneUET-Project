import React from 'react';
import './styles.css';
import dayjs from "dayjs";
import { Icon } from '@progress/kendo-react-common';
import { GenderValue } from "../../../../../utils/information/gender";

const CurriculumVitae = (props) => {
    return (
        <div className="cv">
            <div className="cv-sub-section">
                <div className="cv-avatar">
                    <img className="cv-avatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="avatar" />
                </div>
                <div className="cv-contact">
                    <div className="cv-heading">Liên lạc</div>
                    <div className="cv-contact-row"><i className="material-icons">mail</i>{props.emailVNU}</div>
                    <div className="cv-contact-row"><i className="material-icons">call</i>{props.phone}</div>
                    <div className="cv-contact-row"><i className="material-icons">home</i>{props.address}</div>
                </div>
            </div>
            <div className="cv-main-section">
                <div className="cv-header">
                    <div className="cv-name">{props.name}</div>
                    <div className="cv-basic-info">Giới tính: {GenderValue[props.gender]} <br />
                        Ngày sinh: {dayjs(props.birthday).format('DD/MM/YYYY')}</div>
                    <hr />
                </div>
                <div className="cv-body">
                    <div className="cv-education">
                        <div className="cv-heading">Học vấn</div>
                        <p>Trường Đại học Công nghệ - {props.unit}</p>
                    </div>
                    <div className="cv-activities">
                        <div className="cv-heading">Hoạt động</div>
                        <p>Đoàn Thanh niên - Chức vụ cao nhất: {props.unionPosition} <br />
                            Hội Sinh viên - Chức vụ cao nhất: {props.associationPosition}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurriculumVitae;