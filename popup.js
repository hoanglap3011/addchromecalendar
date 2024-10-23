document.getElementById('get-html').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => {
                    const teamsInfoArray = [
                        { id: "/g/121qfk5v", name: "Thanh Hóa" }, 
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai" }, 
                        { id: "/g/11f08kzdh8", name: "Hồng Lĩnh Hà Tĩnh" }, 
                        { id: "/m/01xn5sc", name: "Bình Dương" }, 
                        { id: "/m/0ghqfd", name: "Nam Định" }, 
                        { id: "/m/064l6nx", name: "Hà Nội" }, 
                        { id: "/m/051x467", name: "Viettel" }, 
                        { id: "/g/1228xg3s", name: "CAHN" }, 
                        { id: "/m/09k53c6", name: "Quảng Nam" }, 
                        { id: "/m/01xn5sr", name: "TP.HCM" }, 
                        { id: "/m/0ghqdc", name: "Bình Định" }, 
                        { id: "/m/0404qjd", name: "Hải Phòng" }, 
                        { id: "/m/026hmd8", name: "Đà Nẵng" }, 
                        { id: "/m/0ghqf1", name: "Sông Lam Nghệ An" }
                        // Thêm các đội khác tương tự
                    ];

                    // Hàm lấy tên đội và sân vận động từ ID
                    function getTeamInfoByIdFromArray(teamId) {
                        const team = teamsInfoArray.find(t => t.id === teamId);
                        if (team) {
                            return `Tên đội: ${team.name}, Sân vận động: ${team.stadium}`;
                        } else {
                            return "Không tìm thấy thông tin đội.";
                        }
                    }

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
                }
            }
        );
    });
});
