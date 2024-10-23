    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => {
                    const teamsInfoArray = [
                        { id: "/g/121qfk5v", name: "Thanh Hóa", stadium: "Sân vận động Thanh Hóa, 37 Lê Quý Đôn, P. Ba Đình, Thạnh Hóa, Thanh Hoá, Việt Nam" }, 
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Sân vận động Pleiku, Quang Trung, P.Tây Sơn, Pleiku, Gia Lai 600000, Việt Nam" }, 
                        { id: "/g/11f08kzdh8", name: "Hồng Lĩnh Hà Tĩnh", stadium: "Sân vận động Hà Tĩnh, Nguyễn Biểu, Nam Hà, Hà Tĩnh, Việt Nam" }, 
                        { id: "/m/01xn5sc", name: "Bình Dương", stadium: "Sân vận động Gò Đậu, Đ. 30 Tháng 4, Phú Thọ, Thủ Dầu Một, Bình Dương, Việt Nam" }, 
                        { id: "/m/0ghqfd", name: "Nam Định", stadium: "Sân vận động Thiên Trường, 5 Đặng Xuân Thiều, Vị Hoàng, Nam Định, Việt Nam"}, 
                        { id: "/m/064l6nx", name: "Hà Nội", stadium: "Sân vận động Hàng Đẫy, 9 P. Trịnh Hoài Đức, Cát Linh, Đống Đa, Hà Nội, Việt Nam" }, 
                        { id: "/m/051x467", name: "Viettel", stadium: "Sân Vận Động Mỹ Đình, Mỹ Đình 1, Nam Từ Liêm, Hà Nội, Việt Nam" }, 
                        { id: "/g/1228xg3s", name: "CAHN", stadium: "Sân vận động Hàng Đẫy, 9 P. Trịnh Hoài Đức, Cát Linh, Đống Đa, Hà Nội, Việt Nam" }, 
                        { id: "/m/09k53c6", name: "Quảng Nam", stadium: "Sân Vận Động Hòa Xuân, Dương Loan, Hoà Xuân, Cẩm Lệ, Đà Nẵng 550000, Việt Nam"}, 
                        { id: "/m/01xn5sr", name: "TP.HCM", stadium: "Sân vận động Thống Nhất, 138 Đ. Đào Duy Từ, Phường 6, Quận 10, Hồ Chí Minh, Việt Nam" }, 
                        { id: "/m/0ghqdc", name: "Bình Định", stadium: "Sân vận động Quy Nhơn, 194 Lê Hồng Phong, Trần Hưng Đạo, Quy Nhơn, Bình Định, Việt Nam"}, 
                        { id: "/m/0404qjd", name: "Hải Phòng", stadium: "Sân vận động Lạch Tray, 15 Lạch Tray, Lê Lợi, Ngô Quyền, Hải Phòng 180000, Việt Nam"}, 
                        { id: "/m/026hmd8", name: "Đà Nẵng", stadium: "Sân vân động Hòa Xuân, Trần Nam Trung, Hoà Xuân, Cẩm Lệ, Đà Nẵng 550000, Việt Nam"}, 
                        { id: "/m/0ghqf1", name: "Sông Lam Nghệ An", stadium: "Sân Vận động Vinh, Đào Tấn, Cửa Nam, Vinh, Nghệ An, Việt Nam"}
                        // Thêm các đội khác tương tự
                    ];


                    // Hàm mở link đến Google Calendar
                    function openGoogleCalendarAdd(text, dates, location, details ) {
                        let url = "https://calendar.google.com/calendar/u/0/r/eventedit?crm=AVAILABLE";
                        if (text) {
                            url +=  "&text=" + text;
                        }
                        if (dates) {
                            url +=  "&dates=" + dates;
                        }
                        if (location) {
                            url +=  "&location=" + location;
                        }
                        if (details) {
                            url +=  "&details=" + details;
                        }
           
                        window.open(url, '_blank');
                    };

                    function convertToISOWithEndTime(thoiGian) {
                        // Xóa các khoảng trắng thừa và tách chuỗi
                        const parts = thoiGian.trim().split(', ');
                        
                        let datePart, timePart;
                        
                        // Kiểm tra xem chuỗi có chứa phần thứ hay không
                        if (parts.length === 3) {
                            // Trường hợp chuỗi bao gồm phần thứ, ngày/tháng và giờ
                            datePart = parts[1];
                            timePart = parts[2];
                        } else if (parts.length === 2) {
                            // Trường hợp chuỗi chỉ bao gồm ngày/tháng và giờ
                            datePart = parts[0];
                            timePart = parts[1];
                        } else {
                            throw new Error("Định dạng không hợp lệ");
                        }
                        
                        // Lấy ngày tháng từ phần ngày/tháng
                        const [day, month] = datePart.split('/');
                        
                        // Lấy giờ từ phần giờ
                        const [hours, minutes] = timePart.split(':');
                        
                        // Lấy năm hiện tại
                        const currentYear = new Date().getFullYear();
                        
                        // Tạo đối tượng Date với thời gian bắt đầu theo giờ Việt Nam
                        const startDate = new Date(currentYear, parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
                        
                        // Tạo đối tượng Date với thời gian kết thúc (tăng thêm 1 giờ)
                        const endDate = new Date(startDate);
                        endDate.setHours(endDate.getHours() + 1);
                        
                        // Định dạng lại thành chuỗi "yyyyMMddThhmmssZ" (chuyển thành giờ UTC)
                        const formattedStartDate = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                        const formattedEndDate = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                        
                        // Kết hợp chuỗi bắt đầu và kết thúc
                        return `${formattedStartDate}/${formattedEndDate}`;
                    }
                    
                    // Ví dụ sử dụng
                    const thoiGian1 = " Th 4, 23/10, 17:00";
                    const thoiGian2 = " 23/10, 17:00";
                    
                    console.log(convertToISOWithEndTime(thoiGian1)); // Kết quả: 20241023T100000Z/20241023T110000Z
                    console.log(convertToISOWithEndTime(thoiGian2)); // Kết quả: 20241023T100000Z/20241023T110000Z
                    
                      

                    // Biến lưu kết quả
                    let tenGiaiDau = '';
                    let thoiGian = '';
                    let doi1id = '';
                    let doi2id = '';

                    // Lấy nội dung của thẻ <span> đầu tiên có jscontroller="zhya9d"
                    const spanTenGiaiDau = document.querySelector('span[jscontroller="zhya9d"]');
                    if (spanTenGiaiDau) {
                        tenGiaiDau = spanTenGiaiDau.textContent;
                    }

                    // Lấy nội dung của thẻ <span> đầu tiên có class="imso_mh__lr-dt-ds"
                    const spanThoiGian = document.querySelector('span.imso_mh__lr-dt-ds');
                    if (spanThoiGian) {
                        thoiGian = spanThoiGian.textContent;
                    }

                    // Lấy giá trị thuộc tính data-df-team-mid của thẻ <div> đầu tiên có jscontroller="QhKwbc"
                    const divsDoi = document.querySelectorAll('div[jscontroller="QhKwbc"]');
                    if (divsDoi.length > 0) {
                        doi1id = divsDoi[0].getAttribute('data-df-team-mid') || '';
                    }
                    // Lấy giá trị thuộc tính data-df-team-mid của thẻ <div> thứ 2 có jscontroller="QhKwbc"
                    if (divsDoi.length > 1) {
                        doi2id = divsDoi[1].getAttribute('data-df-team-mid') || '';
                    }

                    // In ra kết quả để kiểm tra
                    console.log('Tên giải đấu:', tenGiaiDau);
                    console.log('Thời gian:', thoiGian);
                    console.log('Đội 1 ID:', doi1id);
                    console.log('Đội 2 ID:', doi2id);

                    const team1 = teamsInfoArray.find(t => t.id === doi1id);
                    const team2 = teamsInfoArray.find(t => t.id === doi2id);
                    if (team1 && team2) {
                        const title = team1.name + " vs " + team2.name;
                        const time = convertToISOWithEndTime(thoiGian);
                        const location = team1.stadium;
                        openGoogleCalendarAdd(title, time, location, '');
                    }
                }
            }
        );
    });
