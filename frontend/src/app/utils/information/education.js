// Programs
export const ProgramList = [
    "Chuẩn",
    "Chất lượng cao"
];

// Academic Year
export const AcademicBaseYaer = 2018;
export const AcademicYearNow = 2022;
export const AcademicYearList = (() => {
    let yearList = [];
    for (let year = AcademicBaseYaer; year <= AcademicYearNow; year++) {
        yearList.push("QH-" + String(year) + "-I/CQ");
    }
    return yearList;
})();

// Units
export const UnitList = [
    "Khoa Công nghệ Thông tin",
    "Khoa Điện tử Viễn thông",
    "Khoa Vật lý kỹ thuật & Công nghệ Nano",
    "Khoa Cơ học kỹ thuật & Tự động hoá",
    "Khoa Công nghệ Nông nghiệp",
    "Khoa Công nghệ Xây dựng - Giao thông",
    "Viện Công nghệ Hàng không Vũ trụ",
    "Viện Trí tuệ Nhân tạo"
];

// Class ID
export const ClassIDList = (() => {
    let classIDs = new Array(AcademicYearList.length);
    for (let i = 0; i < AcademicYearList.length; i++) {
        classIDs[i] = new Array(UnitList.length);
        for (let j = 0; j < UnitList.length; j++) {
            classIDs[i][j] = new Array(ProgramList.length);
            classIDs[i][j][0] = new Array(0);
            classIDs[i][j][1] = new Array(0);
        }

        // CNTT - Chuan
        const CNTT_Chuan = ["CB", "CC", "CD", "CE", "C-CLC", "J", "N"];
        for (let j = 0; j < CNTT_Chuan.length; j++) {
            classIDs[i][0][0].push(AcademicYearList[i] + "-" + CNTT_Chuan[j]);
        }
        // CNTT - CLC
        const CNTT_CLC = ["N-CLC", "CA-CLC1", "CA-CLC2", "CA-CLC3", "CA-CLC4", "T-CLC"];
        for (let j = 0; j < CNTT_CLC.length; j++) {
            classIDs[i][0][1].push(AcademicYearList[i] + "-" + CNTT_CLC[j]);
        }

        // DTVT - Chuan
        const DTVT_Chuan = ["K", "K1", "K2", "R"];
        for (let j = 0; j < DTVT_Chuan.length; j++) {
            classIDs[i][1][0].push(AcademicYearList[i] + "-" + DTVT_Chuan[j]);
        }
        // DTVT - CLC
        const DTVT_CLC = ["ĐA-CLC", "ĐA-CLC1", "ĐA-CLC2"];
        for (let j = 0; j < DTVT_CLC.length; j++) {
            classIDs[i][1][1].push(AcademicYearList[i] + "-" + DTVT_CLC[j]);
        }

        // CHKT&TDH - Chuan
        const CHKT_TDH_Chuan = ["H", "AT"];
        for (let j = 0; j < CHKT_TDH_Chuan.length; j++) {
            classIDs[i][2][0].push(AcademicYearList[i] + "-" + CHKT_TDH_Chuan[j]);
        }
        // CHKT&TDH - CLC
        const CHKT_TDH_CLC = ["M-CLC", "M-CLC1", "M-CLC2", "M-CLC3"];
        for (let j = 0; j < CHKT_TDH_CLC.length; j++) {
            classIDs[i][2][1].push(AcademicYearList[i] + "-" + CHKT_TDH_CLC[j]);
        }
        // VLKT&CNNN - Chuẩn + CLC
        const VLKT_CNNN = ["E", "V"];
        for (let j = 0; j < VLKT_CNNN.length; j++) {
            classIDs[i][3][0].push(AcademicYearList[i] + "-" + VLKT_CNNN[j]);
            classIDs[i][3][1].push(AcademicYearList[i] + "-" + VLKT_CNNN[j]);
        }

        // NN - Chuẩn + CLC
        const NN = ["AG"];
        for (let j = 0; j < NN.length; j++) {
            classIDs[i][4][0].push(AcademicYearList[i] + "-" + NN[j]);
            classIDs[i][4][1].push(AcademicYearList[i] + "-" + NN[j]);
        }

        // XD-GT - Chuẩn + CLC
        const XD_GT = ["XD", "XD1", "XD2"];
        for (let j = 0; j < XD_GT.length; j++) {
            classIDs[i][5][0].push(AcademicYearList[i] + "-" + XD_GT[j]);
            classIDs[i][5][1].push(AcademicYearList[i] + "-" + XD_GT[j]);
        }

        // HKVT - Chuẩn + CLC
        const HKVT = ["AE"];
        for (let j = 0; j < HKVT.length; j++) {
            classIDs[i][6][0].push(AcademicYearList[i] + "-" + HKVT[j]);
            classIDs[i][6][1].push(AcademicYearList[i] + "-" + HKVT[j]);
        }

        // TTNT - Chuẩn + CLC
        const TTNT = ["AI1", "AI2"];
        for (let j = 0; j < TTNT.length; j++) {
            classIDs[i][7][0].push(AcademicYearList[i] + "-" + TTNT[j]);
            classIDs[i][7][1].push(AcademicYearList[i] + "-" + TTNT[j]);
        }
    }
    return classIDs;
})();