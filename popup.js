document.getElementById('get-html').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => {
                    const teamsInfoArray = [
                        { id: "/m/01xn5sc", name: "Bình Dương", stadium: "Stadium 1" },
                        { id: "/g/121qfk5v", name: "Thanh Hoá", stadium: "Stadium 2" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
                        { id: "/m/0ghqgf", name: "Hoàng Anh Gia Lai", stadium: "Stadium 3" },
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
