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