import React from 'react';
import './styles.css';
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { GenderValue } from "../../../../../utils/information/gender";

const CurriculumVitae = (props) => {
    return (
        <div className="cv">
            <div className="cv-sub-section">
                <div className="cv-avatar">
                    <img className="cv-avatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="avatar" />
                </div>
                <div className="cv-contact">
                    <div className="cv-header">Liên lạc</div>
                    <div className="cv-contact-row"><FontAwesomeIcon icon={faEnvelope} /> &nbsp; {props.emailVNU}</div>
                    <div className="cv-contact-row"><FontAwesomeIcon icon={faPhone} /> &nbsp; {props.phone}</div>
                    <div className="cv-contact-row"><FontAwesomeIcon icon={faLocationDot} /> &nbsp; {props.address}</div>
                </div>
                <div className='cv-references'>
                    <div className="cv-header">Nguồn</div>
                    <div className='cv-references-p'>Thông tin được cung cấp bởi ONE-UET.</div>
                </div>
            </div>
            <div className="cv-main-section">
                <div className="cv-main-header">
                    <div className="cv-name">{props.name}</div>
                    <div className="cv-basic-info">Giới tính: {GenderValue[props.gender]} <br />
                        Ngày sinh: {dayjs(props.birthday).format('DD/MM/YYYY')}</div>
                    <hr />
                </div>
                <div className="cv-body">
                    <div className="cv-education">
                        <div className="cv-header">Học vấn</div>
                        <div className='cv-education-row'>
                            <div className='cv-education-header'>
                                <p>Trường Đại học Công nghệ</p>
                                <p>{props.academicYear + 2018} - Hiện tại</p>
                            </div>
                            <p>{props.unit}</p>
                        </div>
                    </div>
                    <div className="cv-activities">
                        <div className="cv-header">Hoạt động</div>
                        <div className='cv-activities-row'>
                            <div className='cv-activites-header'>
                                <p>Đoàn Thanh niên</p>
                                <p>{props.academicYear + 2018} - Hiện tại</p>
                            </div>
                            <p>{props.unionPosition}</p>
                        </div>
                        <div className='cv-activites-row'>
                            <div className='cv-activites-header'>
                                <p>Hội Sinh viên</p>
                                <p>{props.academicYear + 2018} - Hiện tại</p>
                            </div>
                            <p>{props.associationPosition}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurriculumVitae;